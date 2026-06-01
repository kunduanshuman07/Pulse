type ProjectStatsProps = {
    latestAnalysis?: {
        intelligenceScore: number;
    };
};

export function ProjectStats({
    latestAnalysis,
}: ProjectStatsProps) {
    const intelligence =
        latestAnalysis?.intelligenceScore ||
        0;

    const stats = [
        {
            label: "Market Score",

            value: `${intelligence}%`,

            color:
                "text-cyan-300",
        },

        {
            label: "Audience Match",

            value:
                intelligence > 80
                    ? "Excellent"
                    : "Moderate",

            color:
                "text-emerald-300",
        },

        {
            label: "Trend Direction",

            value:
                intelligence > 75
                    ? "Rising"
                    : "Stable",

            color:
                "text-violet-300",
        },

        {
            label:
                "Virality Potential",

            value: `${Math.max(
                intelligence -
                    8,
                0,
            )}%`,

            color:
                "text-orange-300",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="glass-card rounded-[24px] p-5 sm:rounded-[32px] sm:p-7"
                >
                    <p className="mb-2 text-sm text-white/45 sm:mb-3">
                        {stat.label}
                    </p>

                    <h2
                        className={`text-3xl font-semibold sm:text-4xl lg:text-5xl ${stat.color}`}
                    >
                        {stat.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}