import{IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { Role } from '../../users/entity/user.entity.js';

export class RegisterUserDto {

  @IsString({message: 'Name must be a string'})
  @MinLength(3, {message: 'Name must be at least 3 characters long'})
  @MaxLength(20, {message: 'Name must be at most 20 characters long'})  
  name: string;
  @IsNotEmpty({message: 'Email is required'})
  @IsEmail({},{message: 'Please enter a valid email'})
  email: string;

  @IsString({message: 'Password must be a string'})
  @IsNotEmpty({message: 'Password is required'})
  @MinLength(6, {message: 'Password must be at least 6 characters long'})
  password: string;

  @IsOptional()
  @IsEnum(Role, {message: 'Please enter a valid role'})
  role: Role;
}