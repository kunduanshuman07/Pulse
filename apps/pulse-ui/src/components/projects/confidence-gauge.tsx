import { motion } from "framer-motion";

type Props = {
    score?: number;
};

export function MarketConfidenceGauge({
    score = 0,
}: Props) {
    const radius = 120;

    const circumference =
        2 * Math.PI * radius;

    const progress =
        circumference -
        (score / 100) *
            circumference;

    return (
        <div className="glass-card relative overflow-hidden rounded-[24px] p-5 sm:rounded-[36px] sm:p-8 md:p-10">
            <div className="absolute left-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-[120px]" />

            <div className="absolute bottom-[-100px] right-[-100px] h-[220px] w-[220px] rounded-full bg-violet-500/10 blur-[120px]" />

            <div className="relative z-10">
                <div className="mb-6 sm:mb-10">
                    <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-300/70 sm:mb-3 sm:text-sm sm:tracking-[0.35em]">
                        AI CONFIDENCE
                    </p>

                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                        Market Confidence Gauge
                    </h2>
                </div>

                <div className="flex items-center justify-center">
                    <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px]">
                        <svg
                            viewBox="0 0 320 320"
                            className="h-full w-full -rotate-90"
                            aria-hidden
                        >
                            <circle
                                cx="160"
                                cy="160"
                                r={radius}
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="18"
                                fill="transparent"
                            />

                            <motion.circle
                                cx="160"
                                cy="160"
                                r={radius}
                                stroke="#22d3ee"
                                strokeWidth="18"
                                fill="transparent"
                                strokeLinecap="round"
                                strokeDasharray={
                                    circumference
                                }
                                initial={{
                                    strokeDashoffset:
                                        circumference,
                                }}
                                animate={{
                                    strokeDashoffset:
                                        progress,
                                }}
                                transition={{
                                    duration: 1.8,
                                    ease: "easeOut",
                                }}
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 0.6,
                                }}
                                className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
                            >
                                {score}
                                <span className="text-cyan-300">
                                    %
                                </span>
                            </motion.h1>

                            <p className="mt-2 text-base text-white/50 sm:mt-4 sm:text-lg">
                                Market Potential
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
                    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5 sm:p-6">
                        <p className="mb-2 text-sm text-white/45">
                            Confidence
                        </p>

                        <h3 className="text-2xl font-semibold text-cyan-300 sm:text-3xl">
                            High
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5 sm:p-6">
                        <p className="mb-2 text-sm text-white/45">
                            AI Consensus
                        </p>

                        <h3 className="text-2xl font-semibold text-violet-300 sm:text-3xl">
                            Strong
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5 sm:p-6">
                        <p className="mb-2 text-sm text-white/45">
                            Market Signal
                        </p>

                        <h3 className="text-2xl font-semibold text-emerald-300 sm:text-3xl">
                            Positive
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
