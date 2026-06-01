import { motion } from "framer-motion";

type AuthLoaderProps = {
    progress: number;

    text?: string;
};

export function AuthLoader({
    progress,

    text = "Authenticating",
}: AuthLoaderProps) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-xl">
            <div className="glass-card w-full max-w-md rounded-[28px] p-6 sm:rounded-[36px] sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                        {text}
                    </h2>

                    <p className="text-xl font-semibold text-cyan-300">
                        {progress}%
                    </p>
                </div>

                <div className="h-4 overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: `${progress}%`,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-200"
                    />
                </div>

                <p className="mt-5 text-sm text-white/45">
                    Initializing intelligence systems...
                </p>
            </div>
        </div>
    );
}