import * as Joi from 'joi';

export const envValidationSchema =
    Joi.object({
        PORT: Joi.number().default(
            3000,
        ),

        JWT_SECRET:
            Joi.string().required(),

        DATABASE_URL:
            Joi.string().required(),

        ANALYTICS_SERVICE_URL:
            Joi.string().required(),
    });
