import { api } from "../lib/api";

export const agentExecutionService = {
    async getExecutions(
        analysisId: string,

        token: string,
    ) {
        return api.get(
            `/agent-executions/${analysisId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    },
};