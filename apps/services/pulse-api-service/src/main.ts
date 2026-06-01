import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { winstonLogger } from './common/logger/winston.logger';
import { ResponseInterceptor } from './common/interceptors/respponse.interceptor';
import { AllExceptionsFilter } from './common/filters/all.exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.useLogger({
        log: (message) => winstonLogger.info(message),

        error: (message) => winstonLogger.error(message),

        warn: (message) => winstonLogger.warn(message),

        debug: (message) => winstonLogger.debug(message),

        verbose: (message) => winstonLogger.verbose(message),
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.useGlobalInterceptors(new ResponseInterceptor());

    app.useGlobalFilters(new AllExceptionsFilter());

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Pulse API')
        .setDescription('Pulse Product Intelligence API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(
        app,
        swaggerConfig,
    );

    SwaggerModule.setup('docs', app, document);

    await app.listen(
        process.env.PORT || 3000,
    );

    winstonLogger.info(
        `Pulse API running`,
    );
}

bootstrap().catch((error) => {
    console.error(
        'BOOTSTRAP ERROR:',
        error,
    );
});
