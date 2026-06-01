import { useCallback, useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";

import { toast } from "sonner";

import { useAuth } from "../../context/auth-context";

import { analysisService } from "../../service/analysis.service";
import { projectsService } from "../../service/projects.service";

import { ProjectHero } from "../../components/projects/project-hero";

import { ProjectStats } from "../../components/projects/project-stats";

import { ProjectActivity } from "../../components/projects/project-activity";

import { AgentRadarChart } from "../../components/projects/agent-radar-chart";

import { MarketConfidenceGauge } from "../../components/projects/confidence-gauge";

import { StrategicRecommendations } from "../../components/projects/strategic-recommendations";

import { RiskHeatmap } from "../../components/projects/risk-heatmap";

import { AnalysisProcessingOverlay } from "../../components/projects/analysis-processing-overlay";

import { AnalysisLanguageBar } from "../../components/projects/analysis-language-bar";

import { env } from "../../config/env";
import { usePageTitle } from "../../hooks/use-page-title";
import {
    resolveLocalizedAnalysis,
    type AnalysisView,
} from "../../lib/analysis-localization";
import type { ContentLanguage } from "../../types/language";
import { isContentLanguage } from "../../types/language";

type StreamEvent = {
    event: string;

    agent: string;

    message: string;

    progress: number;
};

type Project = {
    id: string;

    name: string;

    contentLanguage?: ContentLanguage;
};

export function ProjectOverviewPage() {
    usePageTitle("Project Overview");

    const { id } =
        useParams();

    const { token } =
        useAuth();

    const [project, setProject] =
        useState<Project | null>(
            null,
        );

    const [analyses, setAnalyses] =
        useState<AnalysisView[]>(
            [],
        );

    const [
        displayLanguage,
        setDisplayLanguage,
    ] = useState<ContentLanguage>(
        "en",
    );

    const [
        translating,
        setTranslating,
    ] = useState(false);

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

    const fetchProject =
        useCallback(async () => {
            if (!id || !token) {
                return;
            }

            try {
                const response =
                    await projectsService.getProjectById(
                        id,
                        token,
                    );

                const projectData =
                    response?.data;

                setProject(projectData);

                const language =
                    projectData?.contentLanguage;

                if (
                    isContentLanguage(
                        language,
                    )
                ) {
                    setDisplayLanguage(
                        language,
                    );
                }
            } catch {
                toast.error(
                    "Failed to fetch project",
                );
            }
        }, [id, token]);

    const fetchAnalyses =
        useCallback(async () => {
            if (!id || !token) {
                return;
            }

            try {
                const response =
                    await analysisService.getProjectAnalyses(
                        id,
                        token,
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
        }, [id, token]);

    useEffect(() => {
        fetchProject();

        fetchAnalyses();
    }, [fetchProject, fetchAnalyses]);

    const latestAnalysis =
        analyses[0];

    const localizedLatestAnalysis =
        useMemo(
            () =>
                resolveLocalizedAnalysis(
                    latestAnalysis,
                    displayLanguage,
                ),
            [
                latestAnalysis,
                displayLanguage,
            ],
        );

    const localizedAnalyses =
        useMemo(
            () =>
                analyses.map(
                    (analysis) =>
                        resolveLocalizedAnalysis(
                            analysis,
                            displayLanguage,
                        )!,
                ),
            [
                analyses,
                displayLanguage,
            ],
        );

    const handleDisplayLanguageChange =
        async (
            language: ContentLanguage,
        ) => {
            setDisplayLanguage(
                language,
            );

            if (
                !latestAnalysis ||
                !token ||
                latestAnalysis.outputLanguage ===
                    language ||
                latestAnalysis
                    .translations?.[
                    language
                ]
            ) {
                return;
            }

            try {
                setTranslating(true);

                await analysisService.translateAnalysis(
                    latestAnalysis.id,
                    token,
                    language,
                );

                await fetchAnalyses();

                toast.success(
                    language === "hi"
                        ? "Analysis translated to Hindi"
                        : "Analysis translated to English",
                );
            } catch {
                toast.error(
                    "Translation failed. Showing original language.",
                );
            } finally {
                setTranslating(false);
            }
        };

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
                    displayLanguage ===
                        "hi"
                        ? "एआई एजेंट परियोजना का विश्लेषण कर रहे हैं..."
                        : "AI agents analyzing project...",
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
                                        displayLanguage ===
                                            "hi"
                                            ? "एआई विश्लेषण सफलतापूर्वक पूर्ण हुआ"
                                            : "AI analysis completed successfully",
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
                    displayLanguage ===
                        "hi"
                        ? "विश्लेषण शुरू करने में विफल"
                        : "Failed to start analysis",
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
                    localizedLatestAnalysis
                }
                contentLanguage={
                    project?.contentLanguage
                }
            />

            {latestAnalysis && (
                <AnalysisLanguageBar
                    value={
                        displayLanguage
                    }
                    onChange={
                        handleDisplayLanguageChange
                    }
                    translating={
                        translating
                    }
                />
            )}

            <ProjectStats
                latestAnalysis={
                    localizedLatestAnalysis
                }
                displayLanguage={
                    displayLanguage
                }
            />

            <MarketConfidenceGauge
                score={
                    localizedLatestAnalysis
                        ?.intelligenceScore ||
                    0
                }
            />

            <AgentRadarChart
                agentExecutions={
                    localizedLatestAnalysis
                        ?.agentExecutions ||
                    []
                }
            />

            <StrategicRecommendations
                agentExecutions={
                    localizedLatestAnalysis
                        ?.agentExecutions ||
                    []
                }
            />

            <RiskHeatmap
                agentExecutions={
                    localizedLatestAnalysis
                        ?.agentExecutions ||
                    []
                }
            />

            <ProjectActivity
                analyses={
                    localizedAnalyses
                }
                displayLanguage={
                    displayLanguage
                }
            />

            <AnalysisProcessingOverlay
                visible={
                    loadingAnalysis
                }
                events={
                    streamEvents
                }
                displayLanguage={
                    displayLanguage
                }
            />
        </div>
    );
}
