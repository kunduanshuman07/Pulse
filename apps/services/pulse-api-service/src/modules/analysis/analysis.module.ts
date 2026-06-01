import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { Analysis } from "./entities/analysis.entity";

import { Project } from "../projects/entities/project.entity";


import { AnalysisController } from "./analysis.controller";

import { AnalysisService } from "./analysis.service";

import { AnalyticsClientService } from "../../common/services/analytics-client.service";
import { AgentExecution } from "../agent-execution/entities/agent-execution.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Analysis,
            Project,
            AgentExecution,
        ]),
    ],

    controllers: [
        AnalysisController,
    ],

    providers: [
        AnalysisService,
        AnalyticsClientService,
    ],
})
export class AnalysisModule {}