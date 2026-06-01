import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { AgentExecution } from "./entities/agent-execution.entity";

import { AgentExecutionController } from "./agent-execution.controller";

import { AgentExecutionService } from "./agent-execution.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AgentExecution,
        ]),
    ],

    controllers: [
        AgentExecutionController,
    ],

    providers: [
        AgentExecutionService,
    ],

    exports: [
        AgentExecutionService,
    ],
})
export class AgentExecutionModule {}