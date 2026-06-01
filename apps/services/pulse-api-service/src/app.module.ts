import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';

import { HealthModule } from './modules/health/health.module';

import { ProjectsModule } from './modules/projects/projects.module';

import { AnalysisModule } from './modules/analysis/analysis.module';

import { AnalyticsClientService } from './common/services/analytics-client.service';

import { envValidationSchema } from './config/env.validation';

import { AgentExecutionModule } from './modules/agent-execution/agent-execution.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,

            validationSchema:
                envValidationSchema,
        }),

        TypeOrmModule.forRootAsync({
            useFactory: () => {

                return {
                    type: 'postgres',

                    url: process.env.DATABASE_URL,

                    autoLoadEntities: true,

                    synchronize: true,

                    ssl: {
                        rejectUnauthorized: false,
                    },
                };
            },
        }),

        AuthModule,

        HealthModule,

        ProjectsModule,

        AnalysisModule,

        AgentExecutionModule,
    ],

    providers: [
        AnalyticsClientService,
    ],
})
export class AppModule {}
