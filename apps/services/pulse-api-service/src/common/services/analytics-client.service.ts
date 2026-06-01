import axios from "axios";

import { Injectable } from "@nestjs/common";

@Injectable()
export class AnalyticsClientService {
    private analyticsApi =
        axios.create({
            baseURL:
                process.env
                    .ANALYTICS_SERVICE_URL,
        });

    async analyzeProject(
        payload: {
            title: string;
            description: string;
            industry: string;
            target_market: string;
            language?: string;
        },
    ) {
        const response =
            await this.analyticsApi.post(
                "/analyze",
                payload,
            );

        return response.data;
    }

    async translateAnalysis(
        payload: {
            overall_score: number;
            summary: string;
            agents: Array<{
                agent_type: string;
                score: number;
                summary: string;
                insights: string[];
                risks: string[];
                execution_logs: string[];
            }>;
            target_language: string;
        },
    ) {
        const response =
            await this.analyticsApi.post(
                "/translate",
                payload,
            );

        return response.data;
    }
}
