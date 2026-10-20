import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { RegisterUserDto } from './dto/register.dto.js';
import { User } from '../users/entity/user.entity.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';
export type AuthResponse = {currentUser: Omit<User, 'password'> , token: string };
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}
    async register(registerUser:RegisterUserDto): Promise<AuthResponse> {
        const existingUser = await this.usersService.findOneByEmail(registerUser.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const user = await this.usersService.createUser(registerUser);
        const token = await this.generateToken(user.id, user.email);
        const { password, ...result } = user;
        const response = { currentUser: result, token: token };
        return response;
    }

    private async generateToken(userId: number, email: string): Promise<string> {
        const payload = { sub: userId, email };
        return this.jwtService.sign(payload);
    }
    async login(loginUser:LoginDto): Promise<AuthResponse> {
        const user = await this.usersService.findOneByEmail(loginUser.email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(loginUser.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const token = await this.generateToken(user.id, user.email);
        const { password, ...result } = user;
        const response = { currentUser: result, token: token };
        return response;
    }
}
