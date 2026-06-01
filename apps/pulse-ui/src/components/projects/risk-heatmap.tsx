import {
    AlertTriangle,
    ShieldAlert,
    Flame,
} from "lucide-react";

type AgentExecution = {
    id: string;

    agentType: string;

    risks: string[];
};

type Props = {
    agentExecutions: AgentExecution[];
};

export function RiskHeatmap({
    agentExecutions,
}: Props) {
    const allRisks =
        agentExecutions.flatMap(
            (execution) =>
                execution?.risks?.map(
                    (risk) => ({
                        risk,

                        agent:
                            execution.agentType,
                    }),
                ),
        );

    const getSeverity =
        (index: number) => {
            if (index % 3 === 0)
                return {
                    label:
                        "High",

                    border:
                        "border-red-400/10",

                    bg:
                        "bg-red-400/[0.04]",

                    text:
                        "text-red-300",

                    icon:
                        Flame,
                };

            if (index % 2 === 0)
                return {
                    label:
                        "Medium",

                    border:
                        "border-amber-400/10",

                    bg:
                        "bg-amber-400/[0.04]",

                    text:
                        "text-amber-300",

                    icon:
                        AlertTriangle,
                };

            return {
                label:
                    "Low",

                border:
                    "border-cyan-400/10",

                bg:
                    "bg-cyan-400/[0.04]",

                text:
                    "text-cyan-300",

                icon:
                    ShieldAlert,
            };
        };

    return (
        <div className="glass-card relative overflow-hidden rounded-[24px] p-5 sm:rounded-[36px] sm:p-8 md:p-10">
            {/* GLOWS */}

            <div className="absolute left-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-red-500/10 blur-[120px]" />

            <div className="absolute bottom-[-100px] right-[-100px] h-[220px] w-[220px] rounded-full bg-amber-400/10 blur-[120px]" />

            <div className="relative z-10">
                {/* HEADER */}

                <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-red-400/10 sm:h-16 sm:w-16">
                        <ShieldAlert className="text-red-300" />
                    </div>

                    <div className="min-w-0">
                        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-red-300/70 sm:text-sm sm:tracking-[0.35em]">
                            AI RISK INTELLIGENCE
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                            Risk Heatmap
                        </h2>
                    </div>
                </div>

                {/* GRID */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                    {allRisks.map(
                        (
                            item,
                            index,
                        ) => {
                            const severity =
                                getSeverity(
                                    index,
                                );

                            const Icon =
                                severity.icon;

                            return (
                                <div
                                    key={
                                        index
                                    }
                                    className={`rounded-[24px] border p-5 sm:rounded-[28px] sm:p-7 ${severity.border} ${severity.bg}`}
                                >
                                    <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/20">
                                                <Icon
                                                    className={
                                                        severity.text
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <p className="mb-1 text-sm text-white/40">
                                                    Source Agent
                                                </p>

                                                <h3 className="truncate text-lg font-semibold sm:text-xl">
                                                    {
                                                        item?.agent
                                                    }
                                                </h3>
                                            </div>
                                        </div>

                                        <div
                                            className={`w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${severity.border} ${severity.text}`}
                                        >
                                            {
                                                severity.label
                                            }
                                        </div>
                                    </div>

                                    <p className="text-[15px] leading-relaxed text-white/70">
                                        {
                                            item?.risk
                                        }
                                    </p>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
        </div>
    );
}