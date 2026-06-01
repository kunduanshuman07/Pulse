export type LocalizedAgentContent = {
    agentType: string;
    summary: string;
    insights: string[];
    risks: string[];
    logs: string[];
};

export type LocalizedAnalysisContent = {
    summary: string;
    agents: LocalizedAgentContent[];
};

export type AnalysisTranslations = Record<
    string,
    LocalizedAnalysisContent
>;
