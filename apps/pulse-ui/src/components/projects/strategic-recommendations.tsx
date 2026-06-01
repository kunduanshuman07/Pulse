import {
    Sparkles,
    TrendingUp,
    ShieldAlert,
    BrainCircuit,
} from "lucide-react";

type AgentExecution = {
    id: string;

    insights: string[];

    risks: string[];
};

type Props = {
    agentExecutions: AgentExecution[];
};

export function StrategicRecommendations({
    agentExecutions,
}: Props) {
    const insights =
        agentExecutions.flatMap(
            (execution) =>
                execution.insights ||
                [],
        );

    const risks =
        agentExecutions.flatMap(
            (execution) =>
                execution.risks ||
                [],
        );

    return (
        <div className="glass-card relative overflow-hidden rounded-[24px] p-5 md:rounded-[36px] md:p-10">
            {/* GLOWS */}

            <div className="absolute right-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-[120px]" />

            <div className="absolute bottom-[-120px] left-[-80px] h-[220px] w-[220px] rounded-full bg-cyan-400/10 blur-[120px]" />

            <div className="relative z-10">
                {/* HEADER */}

                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-cyan-400/10">
                        <BrainCircuit className="text-cyan-300" />
                    </div>

                    <div className="min-w-0">
                        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-300/70 md:text-sm">
                            EXECUTIVE AI INTELLIGENCE
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                            Strategic Recommendations
                        </h2>
                    </div>
                </div>

                {/* CONTENT */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {/* INSIGHTS */}

                    <div className="rounded-[24px] border border-cyan-400/10 bg-cyan-400/[0.03] p-5 md:rounded-[32px] md:p-8">
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10">
                                <Sparkles className="text-cyan-300" />
                            </div>

                            <div className="min-w-0">
                                <p className="mb-1 text-sm text-cyan-200/60">
                                    AI Opportunity Signals
                                </p>

                                <h3 className="text-2xl font-semibold md:text-3xl">
                                    Strategic Advantages
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {insights.map(
                                (
                                    insight,
                                    index,
                                ) => (
                                    <div
                                        key={
                                            index
                                        }
                                        className="rounded-2xl border border-white/5 bg-white/[0.03] p-5"
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

                    <div className="rounded-[24px] border border-amber-400/10 bg-amber-400/[0.03] p-5 md:rounded-[32px] md:p-8">
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10">
                                <ShieldAlert className="text-amber-300" />
                            </div>

                            <div className="min-w-0">
                                <p className="mb-1 text-sm text-amber-200/60">
                                    AI Risk Assessment
                                </p>

                                <h3 className="text-2xl font-semibold md:text-3xl">
                                    Market Concerns
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {risks.map(
                                (
                                    risk,
                                    index,
                                ) => (
                                    <div
                                        key={
                                            index
                                        }
                                        className="rounded-2xl border border-white/5 bg-white/[0.03] p-5"
                                    >
                                        <div className="mb-4 flex items-center gap-3">
                                            <TrendingUp
                                                className="shrink-0 text-amber-300"
                                                size={
                                                    16
                                                }
                                            />

                                            <p className="text-sm font-medium text-amber-300">
                                                Risk Signal
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
            </div>
        </div>
    );
}
