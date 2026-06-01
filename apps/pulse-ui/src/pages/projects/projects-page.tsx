import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Plus } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { CreateProjectModal } from "../../components/projects/create-project-modal";
import { projectsService } from "../../service/projects.service";
import { ProjectCard } from "../../components/projects/project-card";
import { usePageTitle } from "../../hooks/use-page-title";



type Project = {
    id: string;

    name: string;

    category: string;

    description: string;

    status: string;
};

export function ProjectsPage() {
    usePageTitle("Projects");

    const { token } =
        useAuth();

    const [projects, setProjects] =
        useState<Project[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [openModal, setOpenModal] =
        useState(false);

    const fetchProjects =
        async () => {
            try {
                const response =
                    await projectsService.getProjects(
                        token as string,
                    );

                setProjects(
                    response.data,
                );
            } catch (error: any) {
                toast.error(
                    error?.response?.data
                        ?.message ||
                    "Failed to fetch projects",
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <>
            <div className="space-y-6 sm:space-y-8">
                {/* HEADER */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300/70 sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
                            Intelligence Workspace
                        </p>

                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                            Projects
                        </h1>
                    </div>

                    <button
                        onClick={() =>
                            setOpenModal(
                                true,
                            )
                        }
                        className="flex w-full shrink-0 items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-300 sm:w-auto sm:px-7 sm:py-4 sm:text-[15px]"
                    >
                        <Plus size={18} />

                        Create Project
                    </button>
                </div>

                {/* CONTENT */}

                {loading ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                        {Array.from({
                            length: 6,
                        }).map(
                            (
                                _,
                                index,
                            ) => (
                                <div
                                    key={
                                        index
                                    }
                                    className="glass-card h-[320px] animate-pulse rounded-[32px]"
                                />
                            ),
                        )}
                    </div>
                ) : projects.length ===
                    0 ? (
                    <div className="glass-card flex min-h-[320px] flex-col items-center justify-center rounded-[28px] px-6 py-12 sm:min-h-[420px] sm:rounded-[40px] sm:px-8">
                        <h2 className="mb-4 text-center text-2xl font-semibold sm:text-4xl">
                            No Projects Yet
                        </h2>

                        <p className="mb-8 max-w-lg text-center text-base text-white/45 sm:text-lg">
                            Create your first AI
                            intelligence workspace
                            to begin analyzing
                            audiences, trends,
                            and market potential.
                        </p>

                        <button
                            onClick={() =>
                                setOpenModal(
                                    true,
                                )
                            }
                            className="rounded-2xl bg-cyan-400 px-7 py-4 text-[15px] font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-300"
                        >
                            Create First
                            Project
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                        {projects.map(
                            (
                                project,
                            ) => (
                                <ProjectCard
                                    key={
                                        project.id
                                    }
                                    id={
                                        project.id
                                    }
                                    name={
                                        project.name
                                    }
                                    category={
                                        project.category
                                    }
                                    description={
                                        project.description
                                    }
                                    status={
                                        project.status
                                    }
                                />
                            ),
                        )}
                    </div>
                )}
            </div>

            <CreateProjectModal
                open={openModal}
                onClose={() =>
                    setOpenModal(false)
                }
                onCreated={
                    fetchProjects
                }
            />
        </>
    );
}