import {
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from "recharts";

type AgentExecution = {
    id: string;

    agentType: string;

    score: number;
};

type Props = {
    agentExecutions: AgentExecution[];
};

export function AgentRadarChart({
    agentExecutions,
}: Props) {
    const data =
        agentExecutions.map(
            (agent) => ({
                agent:
                    agent.agentType.replace(
                        " Agent",
                        "",
                    ),

                score:
                    agent.score,
            }),
        );

    return (
        <div className="glass-card rounded-[24px] p-5 sm:rounded-[34px] sm:p-8">
            <div className="mb-6 sm:mb-8">
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300/70 sm:text-sm sm:tracking-[0.3em]">
                    AI VISUALIZATION
                </p>

                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                    Intelligence Radar
                </h2>
            </div>

            <div className="h-[280px] w-full min-w-0 sm:h-[360px] md:h-[450px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <RadarChart
                        data={data}
                    >
                        <PolarGrid
                            stroke="rgba(255,255,255,0.08)"
                        />

                        <PolarAngleAxis
                            dataKey="agent"
                            tick={{
                                fill:
                                    "rgba(255,255,255,0.7)",

                                fontSize: 11,
                            }}
                        />

                        <PolarRadiusAxis
                            angle={90}
                            domain={[
                                0,
                                100,
                            ]}
                            tick={{
                                fill:
                                    "rgba(255,255,255,0.35)",
                            }}
                        />

                        <Radar
                            name="AI Score"
                            dataKey="score"
                            stroke="#22d3ee"
                            fill="#22d3ee"
                            fillOpacity={0.35}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}