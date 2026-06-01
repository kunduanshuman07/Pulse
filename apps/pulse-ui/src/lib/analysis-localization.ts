import type { ContentLanguage } from "../types/language";

export type AgentExecutionView = {
    id: string;
    agentType: string;
    status: string;
    score: number;
    summary: string;
    insights: string[];
    risks: string[];
    logs: string;
};

export type AnalysisView = {
    id: string;
    status: string;
    intelligenceScore: number;
    summary: string;
    createdAt: string;
    outputLanguage?: ContentLanguage;
    translations?: AnalysisTranslations;
    agentExecutions: AgentExecutionView[];
};

type LocalizedAgent = {
    agentType: string;
    summary: string;
    insights: string[];
    risks: string[];
    logs: string[];
};

export type AnalysisTranslations = Partial<
    Record<
        ContentLanguage,
        {
            summary: string;
            agents: LocalizedAgent[];
        }
    >
>;

export function resolveLocalizedAnalysis(
    analysis: AnalysisView | undefined,
    displayLanguage: ContentLanguage,
): AnalysisView | undefined {
    if (!analysis) {
        return undefined;
    }

    const sourceLanguage =
        analysis.outputLanguage || "en";

    if (sourceLanguage === displayLanguage) {
        return analysis;
    }

    const localized =
        analysis.translations?.[
            displayLanguage
        ];

    if (!localized) {
        return analysis;
    }

    const agentExecutions =
        analysis.agentExecutions.map(
            (execution) => {
                const translatedAgent =
                    localized.agents.find(
                        (agent) =>
                            agent.agentType ===
                            execution.agentType,
                    );

                if (!translatedAgent) {
                    return execution;
                }

                return {
                    ...execution,
                    summary:
                        translatedAgent.summary,
                    insights:
                        translatedAgent.insights,
                    risks:
                        translatedAgent.risks,
                    logs: JSON.stringify(
                        translatedAgent.logs,
                    ),
                };
            },
        );

    return {
        ...analysis,
        summary: localized.summary,
        agentExecutions,
    };
}
