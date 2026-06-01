import { Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { AgentExecution } from "./entities/agent-execution.entity";

@Injectable()
export class AgentExecutionService {
    constructor(
        @InjectRepository(AgentExecution)
        private readonly agentExecutionRepository: Repository<AgentExecution>,
    ) {}

    async getExecutions(
        analysisId: string,
    ) {
        return this.agentExecutionRepository.find(
            {
                where: {
                    analysis: {
                        id: analysisId,
                    },
                },

                order: {
                    createdAt:
                        "DESC",
                },
            },
        );
    }
}