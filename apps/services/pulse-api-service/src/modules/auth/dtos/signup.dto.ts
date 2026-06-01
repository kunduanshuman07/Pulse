import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}