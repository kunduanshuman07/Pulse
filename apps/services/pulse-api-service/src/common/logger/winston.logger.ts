import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const winstonLogger = winston.createLogger({
  level: process.env.NODE_ENV === 'production'
    ? 'info'
    : 'debug',

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),

        nestWinstonModuleUtilities.format.nestLike(
          'Pulse',
          {
            prettyPrint: true,
            colors: true,
          },
        ),
      ),
    }),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    new winston.transports.File({
      filename: 'logs/combined.log',

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});