import { IsIn, IsOptional } from 'class-validator';
import { ContentLanguage } from '../../projects/enums/content-language.enum';

export class TranslateAnalysisDto {
    @IsOptional()
    @IsIn([ContentLanguage.EN, ContentLanguage.HI])
    targetLanguage?: ContentLanguage;
}
