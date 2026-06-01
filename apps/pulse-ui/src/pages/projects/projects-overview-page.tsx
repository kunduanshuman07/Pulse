import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { toast } from "sonner";

import { useAuth } from "../../context/auth-context";

import { analysisService } from "../../service/analysis.service";

import { ProjectHero } from "../../components/projects/project-hero";

import { ProjectStats } from "../../components/projects/project-stats";

import { ProjectActivity } from "../../components/projects/project-activity";

import { AgentRadarChart } from "../../components/projects/agent-radar-chart";

import { MarketConfidenceGauge } from "../../components/projects/confidence-gauge";

import { StrategicRecommendations } from "../../components/projects/strategic-recommendations";

import { RiskHeatmap } from "../../components/projects/risk-heatmap";

import { AnalysisProcessingOverlay } from "../../components/projects/analysis-processing-overlay";

import { env } from "../../config/env";
import { usePageTitle } from "../../hooks/use-page-title";

type StreamEvent = {
    event: string;

    agent: string;

    message: string;

    progress: number;
};

type AgentExecution = {
    id: string;

    agentType: string;

    status: string;

    score: number;

    summary: string;

    insights: string[];

    risks: string[];

    logs: string;
};

type Analysis = {
    id: string;

    status: string;

    intelligenceScore: number;

    summary: string;

    createdAt: string;

    agentExecutions: AgentExecution[];
};

export function ProjectOverviewPage() {
    usePageTitle("Project Overview");

    const { id } =
        useParams();

    const { token } =
        useAuth();

    const [analyses, setAnalyses] =
        useState<Analysis[]>(
            [],
        );

    const [
        loadingAnalysis,
        setLoadingAnalysis,
    ] = useState(false);

    const [
        streamEvents,
        setStreamEvents,
    ] = useState<
        StreamEvent[]
    >([]);

    const fetchAnalyses =
        async () => {
            try {
                const response =
                    await analysisService.getProjectAnalyses(
                        id as string,

                        token as string,
                    );

                setAnalyses(
                    response?.data ||
                        [],
                );
            } catch {
                toast.error(
                    "Failed to fetch analyses",
                );
            }
        };

    useEffect(() => {
        fetchAnalyses();
    }, []);

    const runAnalysis =
        async () => {
            let eventSource:
                | EventSource
                | undefined;

            try {
                setLoadingAnalysis(
                    true,
                );

                setStreamEvents(
                    [],
                );

                toast.loading(
                    "AI agents analyzing project...",
                    {
                        id: "analysis",
                    },
                );

                eventSource =
                    new EventSource(
                        env.analyticsStreamUrl,
                    );

                eventSource.onmessage =
                    (
                        event,
                    ) => {
                        const parsed =
                            JSON.parse(
                                event.data,
                            );

                        setStreamEvents(
                            (
                                prev,
                            ) => [
                                ...prev,
                                parsed,
                            ],
                        );

                        if (
                            parsed.progress ===
                            100
                        ) {
                            eventSource?.close();

                            setTimeout(
                                async () => {
                                    await fetchAnalyses();

                                    setLoadingAnalysis(
                                        false,
                                    );

                                    toast.success(
                                        "AI analysis completed successfully",
                                        {
                                            id: "analysis",
                                        },
                                    );
                                },
                                1200,
                            );
                        }
                    };

                await analysisService.createAnalysis(
                    id as string,

                    token as string,
                );
            } catch {
                toast.error(
                    "Failed to start analysis",
                    {
                        id: "analysis",
                    },
                );

                setLoadingAnalysis(
                    false,
                );

                eventSource?.close();
            }
        };

    const latestAnalysis =
        analyses[0];

    return (
        <div className="space-y-6 sm:space-y-8">
            <ProjectHero
                projectId={
                    id as string
                }
                onRunAnalysis={
                    runAnalysis
                }
                loadingAnalysis={
                    loadingAnalysis
                }
                latestAnalysis={
                    latestAnalysis
                }
            />

            <ProjectStats
                latestAnalysis={
                    latestAnalysis
                }
            />

            <MarketConfidenceGauge
                score={
                    latestAnalysis
                        ?.intelligenceScore ||
                    0
                }
            />

            <AgentRadarChart
                agentExecutions={
                    latestAnalysis
                        ?.agentExecutions ||
                    []
                }
            />

            <StrategicRecommendations
                agentExecutions={
                    latestAnalysis
                        ?.agentExecutions ||
                    []
                }
            />

            <RiskHeatmap
                agentExecutions={
                    latestAnalysis
                        ?.agentExecutions ||
                    []
                }
            />

            <ProjectActivity
                analyses={analyses}
            />

            <AnalysisProcessingOverlay
                visible={
                    loadingAnalysis
                }
                events={
                    streamEvents
                }
            />
        </div>
    );
}
