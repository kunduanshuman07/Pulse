import { motion } from "framer-motion";

import {
    BrainCircuit,
    TrendingUp,
    ShieldAlert,
    Sparkles,
    AlertTriangle,
} from "lucide-react";

type Analysis = {
    id: string;

    status: string;

    intelligenceScore: number;

    summary: string;

    createdAt: string;

    agentExecutions: AgentExecution[];
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

import type { ContentLanguage } from "../../types/language";

type Props = {
    analyses: Analysis[];

    displayLanguage?: ContentLanguage;
};

export function ProjectActivity({
    analyses,
    displayLanguage = "en",
}: Props) {
    const isHindi =
        displayLanguage === "hi";
    const latestAnalysis =
        analyses?.[0];

    const agentExecutions =
        latestAnalysis
            ?.agentExecutions || [];

    const totalRisks =
        agentExecutions.flatMap(
            (execution) =>
                execution.risks ||
                [],
        );

    const totalInsights =
        agentExecutions.flatMap(
            (execution) =>
                execution.insights ||
                [],
        );

    return (
        <div className="space-y-8">
            {/* HERO */}

            <section className="glass-card glow-primary relative overflow-hidden rounded-[24px] p-5 md:rounded-[36px] md:p-10">
                <div className="absolute right-[-100px] top-[-100px] h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-[120px]" />

                <div className="absolute bottom-[-120px] left-[40%] h-[220px] w-[220px] rounded-full bg-violet-500/10 blur-[120px]" />

                <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-cyan-300/70 md:text-sm">
                            {isHindi
                                ? "एआई बुद्धिमत्ता अवलोकन"
                                : "AI INTELLIGENCE OVERVIEW"}
                        </p>

                        <h1 className="mb-5 text-4xl font-semibold tracking-tight md:text-6xl">
                            {
                                latestAnalysis?.intelligenceScore
                            }
                            %
                        </h1>

                        <p className="max-w-3xl text-sm leading-relaxed text-white/60 md:text-lg">
                            {
                                latestAnalysis?.summary
                            }
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-5">
                        <p className="mb-2 text-sm text-cyan-200/70">
                            AI STATUS
                        </p>

                        <div className="flex items-center gap-3">
                            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />

                            <p className="text-lg font-semibold text-emerald-300">
                                Operational
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5 md:p-6">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
                            <BrainCircuit className="text-cyan-300" />
                        </div>

                        <p className="mb-2 text-sm text-white/45">
                            AI Agents
                        </p>

                        <h3 className="text-3xl font-semibold md:text-4xl">
                            {
                                agentExecutions.length
                            }
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5 md:p-6">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                            <Sparkles className="text-violet-300" />
                        </div>

                        <p className="mb-2 text-sm text-white/45">
                            Insights Generated
                        </p>

                        <h3 className="text-3xl font-semibold md:text-4xl">
                            {
                                totalInsights.length
                            }
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5 md:p-6">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10">
                            <ShieldAlert className="text-amber-300" />
                        </div>

                        <p className="mb-2 text-sm text-white/45">
                            Risk Signals
                        </p>

                        <h3 className="text-3xl font-semibold md:text-4xl">
                            {
                                totalRisks.length
                            }
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5 md:p-6">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                            <TrendingUp className="text-emerald-300" />
                        </div>

                        <p className="mb-2 text-sm text-white/45">
                            Execution Status
                        </p>

                        <h3 className="text-xl font-semibold text-emerald-300 md:text-2xl">
                            Completed
                        </h3>
                    </div>
                </div>
            </section>

            {/* AGENT EXECUTIONS */}

            <section className="space-y-7">
                {agentExecutions.map(
                    (
                        execution,
                        index,
                    ) => (
                        <motion.div
                            key={
                                execution.id
                            }
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay:
                                    index *
                                    0.08,
                            }}
                            className="glass-card overflow-hidden rounded-[24px] md:rounded-[34px]"
                        >
                            {/* HEADER */}

                            <div className="flex flex-col gap-6 border-b border-white/5 px-5 py-6 md:px-8 md:py-7 xl:flex-row xl:items-center xl:justify-between">
                                <div className="flex min-w-0 items-center gap-5">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-cyan-400/10">
                                        <BrainCircuit className="text-cyan-300" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300/70 md:text-sm">
                                            AI AGENT
                                        </p>

                                        <h2 className="truncate text-2xl font-semibold md:text-3xl">
                                            {
                                                execution.agentType
                                            }
                                        </h2>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4">
                                    <p className="mb-1 text-sm text-cyan-200/70">
                                        Confidence Score
                                    </p>

                                    <h3 className="text-2xl font-semibold text-cyan-300 md:text-3xl">
                                        {
                                            execution.score
                                        }
                                        %
                                    </h3>
                                </div>
                            </div>

                            {/* BODY */}

                            <div className="space-y-10 p-5 md:p-8">
                                {/* SUMMARY */}

                                <div className="min-w-0">
                                    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40 md:text-sm">
                                        Intelligence Summary
                                    </p>

                                    <p className="text-sm leading-relaxed text-white/65 md:text-lg">
                                        {
                                            execution.summary
                                        }
                                    </p>
                                </div>

                                {/* EXECUTION LOGS */}

                                <div className="min-w-0">
                                    <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40 md:text-sm">
                                        Execution Timeline
                                    </p>

                                    <div className="space-y-4">
                                        {JSON.parse(
                                            execution.logs,
                                        ).map(
                                            (
                                                log: string,
                                                idx: number,
                                            ) => (
                                                <div
                                                    key={
                                                        idx
                                                    }
                                                    className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4 md:px-5"
                                                >
                                                    <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-emerald-400" />

                                                    <p className="break-words text-sm leading-relaxed text-white/65">
                                                        {
                                                            log
                                                        }
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* INSIGHTS */}

                                <div className="min-w-0">
                                    <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40 md:text-sm">
                                        Strategic Insights
                                    </p>

                                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                        {execution.insights?.map(
                                            (
                                                insight,
                                                idx,
                                            ) => (
                                                <div
                                                    key={
                                                        idx
                                                    }
                                                    className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5 md:p-6"
                                                >
                                                    <div className="mb-4 flex items-center gap-3">
                                                        <div className="h-3 w-3 shrink-0 rounded-full bg-cyan-300" />

                                                        <p className="text-sm font-medium text-cyan-300">
                                                            AI Insight
                                                        </p>
                                                    </div>

                                                    <p className="break-words text-sm leading-relaxed text-white/70">
                                                        {
                                                            insight
                                                        }
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* RISKS */}

                                <div className="min-w-0">
                                    <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40 md:text-sm">
                                        Risk Signals
                                    </p>

                                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                        {execution.risks?.map(
                                            (
                                                risk,
                                                idx,
                                            ) => (
                                                <div
                                                    key={
                                                        idx
                                                    }
                                                    className="rounded-2xl border border-amber-400/10 bg-amber-400/[0.04] p-5 md:p-6"
                                                >
                                                    <div className="mb-4 flex items-center gap-3">
                                                        <AlertTriangle
                                                            className="shrink-0 text-amber-300"
                                                            size={
                                                                16
                                                            }
                                                        />

                                                        <p className="text-sm font-medium text-amber-300">
                                                            Risk Alert
                                                        </p>
                                                    </div>

                                                    <p className="break-words text-sm leading-relaxed text-white/70">
                                                        {
                                                            risk
                                                        }
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ),
                )}
            </section>
        </div>
    );
}
