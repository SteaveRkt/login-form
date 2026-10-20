import{IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({message: 'Email is required'})
  @IsEmail({},{message: 'Please enter a valid email'})
  email: string;

  @IsString({message: 'Password must be a string'})
  @IsNotEmpty({message: 'Password is required'})
  @MinLength(6, {message: 'Password must be at least 6 characters long'})
  password: string;
}