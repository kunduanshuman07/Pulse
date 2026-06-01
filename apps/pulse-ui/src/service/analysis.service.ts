import { api } from "../lib/api";

export const analysisService = {
    createAnalysis: async (
        projectId: string,

        token: string,
    ) => {
        const response =
            await api.post(
                "/analysis",
                {
                    projectId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

        return response.data;
    },

    getProjectAnalyses: async (
        projectId: string,

        token: string,
    ) => {
        const response =
            await api.get(
                `/analysis/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

        return response.data;
    },
};