import { motion } from "framer-motion";

import {
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

type ProjectCardProps = {
    id: string;

    name: string;

    category: string;

    description: string;

    status: string;
};

export function ProjectCard({
    id,

    name,

    category,

    description,

    status,
}: ProjectCardProps) {
    const navigate =
        useNavigate();

    return (
        <motion.div
            whileHover={{
                y: -8,
            }}
            whileTap={{
                scale: 0.99,
            }}
            onClick={() =>
                navigate(
                    `/projects/${id}`,
                )
            }
            className="glass-card group relative cursor-pointer overflow-hidden rounded-[28px] p-5 transition-all duration-500 sm:rounded-[36px] sm:p-7"
        >
            {/* GLOW */}

            <div className="absolute right-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full bg-cyan-400/10 blur-[90px] transition-all duration-500 group-hover:bg-cyan-400/20" />

            <div className="absolute bottom-[-80px] left-[20%] h-[140px] w-[140px] rounded-full bg-violet-500/10 blur-[80px]" />

            {/* HEADER */}

            <div className="relative z-10 mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="mb-3 flex items-center gap-2 sm:mb-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                            <Sparkles
                                size={16}
                            />
                        </div>

                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
                            {category}
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight transition-all duration-300 group-hover:text-cyan-100 sm:max-w-[260px] sm:text-3xl">
                        {name}
                    </h2>
                </div>

                {/* STATUS */}

                <div className="flex w-fit shrink-0 items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 sm:px-4 sm:py-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />

                    <p className="text-sm font-medium text-emerald-300">
                        {status}
                    </p>
                </div>
            </div>

            {/* DESCRIPTION */}

            <p className="relative z-10 line-clamp-3 text-[15px] leading-relaxed text-white/55">
                {description}
            </p>

            {/* METRICS */}

            <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="mb-2 text-sm text-white/40">
                        AI Confidence
                    </p>

                    <h3 className="text-3xl font-semibold text-cyan-300">
                        94%
                    </h3>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="mb-2 text-sm text-white/40">
                        Market Score
                    </p>

                    <h3 className="text-3xl font-semibold text-violet-300">
                        87
                    </h3>
                </div>
            </div>

            {/* FOOTER */}

            <div className="relative z-10 mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />

                    <p className="text-sm text-white/45">
                        Analysis active
                    </p>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();

                        navigate(
                            `/projects/${id}`,
                        );
                    }}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-white sm:w-auto"
                >
                    Open Workspace

                    <ArrowUpRight
                        size={16}
                    />
                </button>
            </div>
        </motion.div>
    );
}