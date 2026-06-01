import { api } from "../lib/api";

export const projectsService = {
    getProjects: async (
        token: string,
    ) => {
        const response =
            await api.get(
                "/projects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

        return response.data;
    },

    getProjectById: async (
        projectId: string,
        token: string,
    ) => {
        const response =
            await api.get(
                `/projects/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

        return response.data;
    },

    createProject: async (
        payload: {
            name: string;

            category: string;

            description: string;

            contentLanguage?: "en" | "hi";
        },

        token: string,
    ) => {
        const response =
            await api.post(
                "/projects/create",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

        return response.data;
    },

    deleteProject: async (
        payload: {
            id: string;
        },

        token: string,
    ) => {
        const response =
            await api.delete(
                `/projects/${payload.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

        return response.data;
    },
};