import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/auth.entity";
import { Repository } from "typeorm";
import { SignupDto } from "./dtos/signup.dto";
import { winstonLogger } from "src/common/logger/winston.logger";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dtos/login.dto";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async signup(input: SignupDto) {
        const { email, password, name } = input;
        winstonLogger.info(`Signup attempted for email: ${email}`);

        const existingUser = await this.userRepository.findOne({
            where: { email }
        })

        if (existingUser) {
            const message = `Signup failed. Reason: User already exists with this email.`;
            winstonLogger.error(message);
            throw new BadRequestException(message)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            name
        });

        await this.userRepository.save(user);

        winstonLogger.info(`User created successfully. Email: ${email}`);

        return {
            message: 'User created successfully',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }

    async login(input: LoginDto) {
        const { email, password } = input;
        winstonLogger.info(`Login attempt for email: ${email}`);

        const user = await this.userRepository.findOne({
            where: { email }
        });

        if (!user) {
            const message = `User not found`;
            winstonLogger.error(message);
            throw new NotFoundException(message);
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            const message = `Invalid Password`;
            winstonLogger.error(message);
            throw new BadRequestException(message);
        }

        const accessToken = jwt.sign(
            {
                sub: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
        );

        winstonLogger.info(
            `Login successful for user: ${user.email}`,
        );

        return {
            message: 'Login successful',
            data: {
                access_token: accessToken,
            },
        };
    }
}