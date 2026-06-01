import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common";


import { AnalysisService } from "./analysis.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CreateAnalysisDto } from "./dtos/create-analysis.dto";
import { TranslateAnalysisDto } from "./dtos/translate-analysis.dto";


@Controller({
    path: 'analysis',
    version: '1',
})
@UseGuards(JwtAuthGuard)
export class AnalysisController {
    constructor(
        private readonly analysisService: AnalysisService,
    ) {}

    @Post()
    createAnalysis(
        @Body()
        createAnalysisDto: CreateAnalysisDto,
    ) {
        return this.analysisService.createAnalysis(
            createAnalysisDto.projectId,
        );
    }

    @Get(":projectId")
    getProjectAnalyses(
        @Param("projectId")
        projectId: string,
    ) {
        return this.analysisService.getProjectAnalyses(
            projectId,
        );
    }

    @Post(":analysisId/translate")
    translateAnalysis(
        @Param("analysisId")
        analysisId: string,

        @Body()
        translateAnalysisDto: TranslateAnalysisDto,
    ) {
        return this.analysisService.translateAnalysis(
            analysisId,
            translateAnalysisDto.targetLanguage,
        );
    }
}