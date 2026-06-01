import {
    Injectable,
    NotFoundException,
} from "@nestjs/common";

import {
    InjectRepository,
} from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { Analysis } from "./entities/analysis.entity";

import { Project } from "../projects/entities/project.entity";

import { AnalyticsClientService } from "../../common/services/analytics-client.service";

import { winstonLogger } from "../../common/logger/winston.logger";
import { AgentExecution } from "../agent-execution/entities/agent-execution.entity";
import { ContentLanguage } from "../projects/enums/content-language.enum";
import {
    AnalysisTranslations,
    LocalizedAnalysisContent,
} from "./types/analysis-translations.type";

@Injectable()
export class AnalysisService {
    constructor(
        @InjectRepository(Analysis)
        private readonly analysisRepository: Repository<Analysis>,

        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,

        @InjectRepository(AgentExecution)
        private readonly agentExecutionRepository: Repository<AgentExecution>,

        private readonly analyticsClientService: AnalyticsClientService,
    ) { }

    async createAnalysis(
        projectId: string,
    ) {
        winstonLogger.info(
            `Starting analysis for project: ${projectId}`,
        );

        const project =
            await this.projectRepository.findOne(
                {
                    where: {
                        id: projectId,
                    },
                },
            );

        if (!project) {
            winstonLogger.error(
                `Project not found: ${projectId}`,
            );

            throw new NotFoundException(
                "Project not found",
            );
        }

        const outputLanguage =
            project.contentLanguage ||
            ContentLanguage.EN;

        winstonLogger.info(
            `Project found: ${project.name} (${outputLanguage})`,
        );

        let analyticsResult;

        try {
            const analytics =
                await this.analyticsClientService.analyzeProject(
                    {
                        title:
                            project.name,

                        description:
                            project.description,

                        industry:
                            project.category,

                        target_market:
                            "Students",

                        language:
                            outputLanguage,
                    },
                );
            analyticsResult = analytics;
            winstonLogger.info(
                "Analytics service response received",
            );
        } catch (error) {
            winstonLogger.error(error);
        }

        const analysis =
            this.analysisRepository.create(
                {
                    status:
                        "completed",

                    intelligenceScore:
                        analyticsResult.overall_score,

                    summary:
                        analyticsResult.summary,

                    outputLanguage,

                    translations: null,

                    project,
                },
            );

        const savedAnalysis =
            await this.analysisRepository.save(
                analysis,
            );

        winstonLogger.info(
            `Analysis saved: ${savedAnalysis.id}`,
        );

        for (const agent of analyticsResult.agents) {
            winstonLogger.info(
                `Saving agent execution: ${agent.agent_type}`,
            );

            const execution =
                this.agentExecutionRepository.create(
                    {
                        agentType:
                            agent.agent_type,

                        status:
                            "completed",

                        score:
                            agent.score,

                        summary:
                            agent.summary,

                        insights:
                            agent.insights,

                        risks:
                            agent.risks,

                        logs: JSON.stringify(
                            agent.execution_logs,
                        ),

                        analysis:
                            savedAnalysis,
                    },
                );

            await this.agentExecutionRepository.save(
                execution,
            );
        }

        const analysisWithAgents =
            await this.analysisRepository.findOne(
                {
                    where: {
                        id: savedAnalysis.id,
                    },

                    relations: {
                        agentExecutions: true,
                    },
                },
            );

        if (
            outputLanguage ===
            ContentLanguage.EN
        ) {
            await this.ensureTranslation(
                analysisWithAgents!,
                ContentLanguage.HI,
            );
        } else {
            await this.ensureTranslation(
                analysisWithAgents!,
                ContentLanguage.EN,
            );
        }

        return this.analysisRepository.findOne(
            {
                where: {
                    id: savedAnalysis.id,
                },

                relations: {
                    agentExecutions: true,
                },
            },
        );
    }

    async translateAnalysis(
        analysisId: string,
        targetLanguage: ContentLanguage = ContentLanguage.HI,
    ) {
        const analysis =
            await this.analysisRepository.findOne(
                {
                    where: {
                        id: analysisId,
                    },

                    relations: {
                        agentExecutions: true,
                    },
                },
            );

        if (!analysis) {
            throw new NotFoundException(
                "Analysis not found",
            );
        }

        await this.ensureTranslation(
            analysis,
            targetLanguage,
        );

        return this.analysisRepository.findOne(
            {
                where: {
                    id: analysisId,
                },

                relations: {
                    agentExecutions: true,
                },
            },
        );
    }

    private async ensureTranslation(
        analysis: Analysis,
        targetLanguage: ContentLanguage,
    ) {
        const existing =
            analysis.translations?.[
                targetLanguage
            ];

        if (existing) {
            return analysis;
        }

        if (
            analysis.outputLanguage ===
            targetLanguage
        ) {
            return analysis;
        }

        try {
            const translated =
                await this.analyticsClientService.translateAnalysis(
                    {
                        overall_score:
                            analysis.intelligenceScore,

                        summary:
                            analysis.summary,

                        agents:
                            analysis.agentExecutions.map(
                                (
                                    execution,
                                ) => ({
                                    agent_type:
                                        execution.agentType,

                                    score:
                                        execution.score,

                                    summary:
                                        execution.summary,

                                    insights:
                                        execution.insights ||
                                        [],

                                    risks:
                                        execution.risks ||
                                        [],

                                    execution_logs:
                                        JSON.parse(
                                            execution.logs ||
                                                "[]",
                                        ),
                                }),
                            ),

                        target_language:
                            targetLanguage,
                    },
                );

            const localized: LocalizedAnalysisContent =
                {
                    summary:
                        translated.summary,

                    agents:
                        translated.agents.map(
                            (
                                agent: {
                                    agent_type: string;
                                    summary: string;
                                    insights: string[];
                                    risks: string[];
                                    execution_logs: string[];
                                },
                            ) => ({
                                agentType:
                                    agent.agent_type,

                                summary:
                                    agent.summary,

                                insights:
                                    agent.insights,

                                risks:
                                    agent.risks,

                                logs:
                                    agent.execution_logs,
                            }),
                        ),
                };

            const translations: AnalysisTranslations =
                {
                    ...(analysis.translations ||
                        {}),

                    [targetLanguage]:
                        localized,
                };

            analysis.translations =
                translations;

            await this.analysisRepository.save(
                analysis,
            );

            winstonLogger.info(
                `Stored ${targetLanguage} translation for analysis ${analysis.id}`,
            );
        } catch (error) {
            winstonLogger.error(
                `Translation failed for analysis ${analysis.id}`,
            );
            winstonLogger.error(error);
        }

        return analysis;
    }

    async getProjectAnalyses(
        projectId: string,
    ) {
        winstonLogger.info(
            `Fetching analyses for project: ${projectId}`,
        );

        return this.analysisRepository.find(
            {
                where: {
                    project: {
                        id: projectId,
                    },
                },

                relations: {
                    agentExecutions: true,
                },

                order: {
                    createdAt:
                        "DESC",
                },
            },
        );
    }
}
