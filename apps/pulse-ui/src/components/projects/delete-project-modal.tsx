import {
    AnimatePresence,
    motion,
} from "framer-motion";

import { useState } from "react";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { projectsService } from "../../service/projects.service";


type DeleteProjectModalProps = {
    open: boolean;

    onClose: () => void;

    projectId: string;

    projectName: string;
};

export function DeleteProjectModal({
    open,

    onClose,
    projectId,
    projectName,
}: DeleteProjectModalProps) {
    const navigate =
        useNavigate();

    const { token } =
        useAuth();

    const [confirmText, setConfirmText] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const isValid =
        confirmText === projectName;

    const handleDelete =
        async () => {
            try {
                setLoading(true);
                await projectsService.deleteProject( {id: projectId}, token as string, )
                await new Promise(
                    (resolve) =>
                        setTimeout(
                            resolve,
                            1500,
                        ),
                );

                toast.success(
                    "Project deleted successfully",
                );

                navigate(
                    "/projects",
                );
            } catch {
                toast.error(
                    "Failed to delete project",
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <AnimatePresence>
            {open && (
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
                    className="fixed inset-0 z-[200] flex items-end justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-xl sm:items-center sm:p-6"
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.92,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.92,
                            y: 40,
                        }}
                        className="glass-card w-full max-w-xl rounded-[28px] p-6 sm:rounded-[40px] sm:p-8 md:p-10"
                    >
                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-red-300/70 sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
                            Danger Zone
                        </p>

                        <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:mb-5 sm:text-4xl md:text-5xl">
                            Delete Project
                        </h2>

                        <p className="mb-6 text-base leading-relaxed text-white/55 sm:mb-8 sm:text-lg">
                            This action cannot be
                            undone. Type{" "}
                            <span className="font-semibold text-red-300">
                                {projectName}
                            </span>{" "}
                            to confirm deletion.
                        </p>

                        <input
                            value={
                                confirmText
                            }
                            onChange={(e) =>
                                setConfirmText(
                                    e.target
                                        .value,
                                )
                            }
                            placeholder={`Type "${projectName}"`}
                            className="h-14 w-full rounded-2xl border border-red-400/10 bg-red-400/[0.03] px-5 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-red-400/20"
                        />

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                            <button
                                onClick={
                                    onClose
                                }
                                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] sm:w-auto"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={
                                    !isValid ||
                                    loading
                                }
                                onClick={
                                    handleDelete
                                }
                                className="w-full rounded-2xl bg-red-400 px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-red-300 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                            >
                                {loading
                                    ? "Deleting..."
                                    : "Delete Permanently"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}