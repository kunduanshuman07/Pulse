import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class JwtAuthGuard
    implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean {
        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();

        const authHeader =
            request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException(
                'Authorization header missing',
            );
        }

        const [type, token] =
            authHeader.split(' ');

        if (
            type !== 'Bearer' ||
            !token
        ) {
            throw new UnauthorizedException(
                'Invalid authorization token',
            );
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string,
            ) as JwtPayload;

            request.user = decoded;

            return true;
        } catch (error) {
            throw new UnauthorizedException(
                'Invalid or expired token',
            );
        }
    }
}