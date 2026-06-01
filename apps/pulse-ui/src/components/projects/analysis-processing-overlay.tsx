import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    BrainCircuit,
    Sparkles,
} from "lucide-react";

type StreamEvent = {
    event: string;

    agent: string;

    message: string;

    progress: number;
};

type Props = {
    visible: boolean;

    events: StreamEvent[];
};

export function AnalysisProcessingOverlay({
    visible,
    events,
}: Props) {
    const latestProgress =
        events[
            events.length - 1
        ]?.progress || 0;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-2xl sm:p-6"
                >
                    <div className="relative w-full max-w-[720px] overflow-hidden rounded-[28px] border border-white/10 bg-[#060816] p-5 sm:rounded-[40px] sm:p-8 md:p-10">
                        {/* GLOWS */}

                        <div className="absolute left-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-[120px]" />

                        <div className="absolute bottom-[-120px] right-[-120px] h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-[120px]" />

                        <div className="relative z-10">
                            {/* HEADER */}

                            <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:gap-5">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-cyan-400/10 sm:h-20 sm:w-20">
                                    <BrainCircuit
                                        className="h-7 w-7 text-cyan-300 sm:h-[34px] sm:w-[34px]"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-300/70 sm:text-sm sm:tracking-[0.35em]">
                                        AI ORCHESTRATION ACTIVE
                                    </p>

                                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                                        Running Analysis
                                    </h1>
                                </div>
                            </div>

                            {/* TERMINAL */}

                            <div className="rounded-[24px] border border-white/5 bg-black/30 p-4 sm:rounded-[32px] sm:p-7">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-red-400" />

                                    <div className="h-3 w-3 rounded-full bg-yellow-400" />

                                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                </div>

                                {/* STREAMED EVENTS */}

                                <div className="h-[220px] space-y-3 overflow-y-auto pr-2 sm:h-[280px] md:h-[320px]">
                                    {events
                                        .slice(-8)
                                        .map(
                                            (
                                                event,
                                                index,
                                            ) => (
                                                <motion.div
                                                    key={
                                                        index
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                                >
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <Sparkles
                                                            size={
                                                                14
                                                            }
                                                            className="text-cyan-300"
                                                        />

                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-medium text-white/85">
                                                                {
                                                                    event.agent
                                                                }
                                                            </p>

                                                            <p className="text-xs uppercase tracking-wide text-cyan-300">
                                                                {
                                                                    event.event
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="text-xs text-white/35">
                                                        {new Date().toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute:
                                                                    "2-digit",
                                                                hour12: true,
                                                            },
                                                        )}
                                                    </p>
                                                </motion.div>
                                            ),
                                        )}
                                </div>
                            </div>

                            {/* PROGRESS */}

                            <div className="mt-10">
                                <div className="mb-4 flex items-center justify-between">
                                    <p className="text-sm text-white/45">
                                        AI Intelligence Pipeline
                                    </p>

                                    <p className="text-sm font-medium text-cyan-300">
                                        {
                                            latestProgress
                                        }
                                        %
                                    </p>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                                    <motion.div
                                        animate={{
                                            width:
                                                `${latestProgress}%`,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                        }}
                                        className="h-full rounded-full bg-cyan-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
