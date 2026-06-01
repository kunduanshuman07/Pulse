import {
    AnimatePresence,
    motion,
} from "framer-motion";

import { useState } from "react";

import { toast } from "sonner";

import { X } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { projectsService } from "../../service/projects.service";



type CreateProjectModalProps = {
    open: boolean;

    onClose: () => void;

    onCreated: () => void;
};

export function CreateProjectModal({
    open,

    onClose,

    onCreated,
}: CreateProjectModalProps) {
    const { token } =
        useAuth();

    const [name, setName] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleCreateProject =
        async () => {
            if (
                !name ||
                !category ||
                !description
            ) {
                toast.error(
                    "Please fill all fields",
                );

                return;
            }

            try {
                setLoading(true);

                await projectsService.createProject(
                    {
                        name,

                        category,

                        description,
                    },

                    token as string,
                );

                toast.success(
                    "Project created successfully",
                );

                setName("");

                setCategory("");

                setDescription("");

                onCreated();

                onClose();
            } catch (error: any) {
                toast.error(
                    error?.response?.data
                        ?.message ||
                        "Failed to create project",
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
                    {/* MODAL */}

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
                        transition={{
                            duration: 0.25,
                        }}
                        className="glass-card relative max-h-[min(90vh,900px)] w-full max-w-2xl overflow-y-auto rounded-[28px] p-6 sm:rounded-[40px] sm:p-8 md:p-10"
                    >
                        {/* GLOW */}

                        <div className="absolute right-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-[120px]" />

                        {/* CLOSE */}

                        <button
                            onClick={onClose}
                            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/60 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        {/* HEADER */}

                        <div className="relative z-10 mb-10">
                            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300/70">
                                Intelligence Workspace
                            </p>

                            <h2 className="pr-12 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                                Create Project
                            </h2>
                        </div>

                        {/* FORM */}

                        <div className="relative z-10 space-y-6">
                            {/* NAME */}

                            <div>
                                <label className="mb-3 block text-sm text-white/50">
                                    Project Name
                                </label>

                                <input
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e
                                                .target
                                                .value,
                                        )
                                    }
                                    placeholder="Pulse AI"
                                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-cyan-400/30 focus:bg-cyan-400/[0.03]"
                                />
                            </div>

                            {/* CATEGORY */}

                            <div>
                                <label className="mb-3 block text-sm text-white/50">
                                    Category
                                </label>

                                <input
                                    value={
                                        category
                                    }
                                    onChange={(e) =>
                                        setCategory(
                                            e
                                                .target
                                                .value,
                                        )
                                    }
                                    placeholder="AI SaaS"
                                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-cyan-400/30 focus:bg-cyan-400/[0.03]"
                                />
                            </div>

                            {/* DESCRIPTION */}

                            <div>
                                <label className="mb-3 block text-sm text-white/50">
                                    Description
                                </label>

                                <textarea
                                    value={
                                        description
                                    }
                                    onChange={(e) =>
                                        setDescription(
                                            e
                                                .target
                                                .value,
                                        )
                                    }
                                    placeholder="Describe your product vision, market, audience, and launch goals..."
                                    className="min-h-[180px] w-full resize-none rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-cyan-400/30 focus:bg-cyan-400/[0.03]"
                                />
                            </div>

                            {/* ACTIONS */}

                            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
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
                                        loading
                                    }
                                    onClick={
                                        handleCreateProject
                                    }
                                    className="w-full rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                >
                                    {loading
                                        ? "Creating..."
                                        : "Create Project"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}