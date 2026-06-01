import {
    Controller,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller({
    path: 'health',
    version: '1',
})
export class HealthController {
    @Get()
    @UseGuards(JwtAuthGuard)
    health(@Req() request: Request) {
        return {
            message: 'Health check successful',
            data: {
                status: 'ok',
                user: request['user'],
            },
        };
    }
}