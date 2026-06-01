import { motion } from "framer-motion";

import {
    BrainCircuit,
    Play,
    Sparkles,
} from "lucide-react";

import type { ContentLanguage } from "../../types/language";

type Props = {
    projectId: string;

    onRunAnalysis: () => void;

    loadingAnalysis: boolean;

    contentLanguage?: ContentLanguage;

    latestAnalysis?: {
        intelligenceScore: number;

        summary: string;
    };
};

export function ProjectHero({
    onRunAnalysis,
    loadingAnalysis,
    latestAnalysis,
    contentLanguage = "en",
}: Props) {
    const isHindi =
        contentLanguage === "hi";
    return (
        <section className="glass-card glow-primary relative overflow-hidden rounded-[32px] p-5 md:p-8 xl:p-12">
            {/* GLOWS */}

            <div className="absolute left-[-120px] top-[-120px] h-[240px] w-[240px] rounded-full bg-cyan-400/10 blur-[120px]" />

            <div className="absolute bottom-[-140px] right-[-120px] h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-[120px]" />

            <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
                {/* LEFT */}

                <div className="max-w-4xl">
                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/10 bg-cyan-400/10 px-4 py-2">
                        <Sparkles
                            size={16}
                            className="text-cyan-300"
                        />

                        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                            {isHindi
                                ? "एआई उत्पाद बुद्धिमत्ता"
                                : "AI PRODUCT INTELLIGENCE"}
                        </p>
                    </div>

                    <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl xl:text-7xl">
                        AI-Powered
                        <span className="block bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                            Market Analysis
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">
                        Analyze your
                        startup, product,
                        or idea using
                        autonomous AI
                        agents specialized
                        in audience
                        intelligence,
                        market trends,
                        competitor
                        evaluation, and
                        virality prediction.
                    </p>

                    {latestAnalysis && (
                        <div className="mt-8 rounded-3xl border border-white/5 bg-white/[0.03] p-5 md:p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <BrainCircuit className="text-cyan-300" />

                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
                                    Latest AI Intelligence
                                </p>
                            </div>

                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-4xl font-semibold md:text-5xl">
                                        {
                                            latestAnalysis.intelligenceScore
                                        }
                                        %
                                    </h2>

                                    <p className="mt-2 text-sm text-white/45">
                                        Market Confidence
                                    </p>
                                </div>

                                <p className="max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                                    {
                                        latestAnalysis.summary
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT */}

                <div className="flex w-full flex-col gap-5 xl:w-auto">
                    <motion.button
                        whileHover={{
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        onClick={
                            onRunAnalysis
                        }
                        disabled={
                            loadingAnalysis
                        }
                        className="flex w-full items-center justify-center gap-3 rounded-3xl bg-cyan-400 px-6 py-5 text-base font-semibold text-black transition-all hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 md:px-10 xl:w-auto"
                    >
                        <Play
                            size={18}
                        />

                        {loadingAnalysis
                            ? isHindi
                                ? "विश्लेषण चल रहा है..."
                                : "Running Analysis..."
                            : isHindi
                              ? "एआई विश्लेषण चलाएं"
                              : "Run AI Analysis"}
                    </motion.button>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5">
                            <p className="mb-2 text-sm text-white/45">
                                Active Agents
                            </p>

                            <h3 className="text-3xl font-semibold text-cyan-300">
                                4
                            </h3>
                        </div>

                        <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5">
                            <p className="mb-2 text-sm text-white/45">
                                Analysis Engine
                            </p>

                            <h3 className="text-xl font-semibold text-emerald-300">
                                Operational
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
