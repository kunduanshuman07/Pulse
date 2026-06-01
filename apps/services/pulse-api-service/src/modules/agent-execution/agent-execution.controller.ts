import {
    Controller,
    Get,
    Param,
} from "@nestjs/common";
import { AgentExecutionService } from "./agent-execution.service";


@Controller({
    path: 'agent-executions',
    version: '1'
}
)
export class AgentExecutionController {
    constructor(
        private readonly agentExecutionService: AgentExecutionService,
    ) { }

    @Get(":analysisId")
    async getExecutions(
        @Param("analysisId")
        analysisId: string,
    ) {
        return this.agentExecutionService.getExecutions(
            analysisId,
        );
    }
}