import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsOptional,
    IsEnum,
} from 'class-validator';
export class CreateUserDto {
    @IsString({message: 'Name must be a string'})
    @IsNotEmpty({message: 'Name is required'})
    @MinLength(3, {message: 'Name must be at least 3 characters long'})
    @MaxLength(20, {message: 'Name must be at most 20 characters long'})
    name: string;

    @IsNotEmpty({message: 'Password is required'})
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @MaxLength(28, {message: 'Password must be at most 28 characters long'})
    password: string;

    
    @IsEmail({}, {message: 'Email must be a valid email address'})
    @IsNotEmpty({message: 'Email is required'})
    email: string;

    @IsOptional()
    @IsEnum(['user', 'admin'], {message: 'Role must be either user or admin'})
    role?: 'user' | 'admin';
}