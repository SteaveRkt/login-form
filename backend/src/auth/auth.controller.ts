import { Body, Controller, Get, HttpCode, HttpStatus, Post ,Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './dto/register.dto.js';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Throttle({default: { ttl: 1000, limit: 5 }})
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerUser: RegisterUserDto) {
        return this.authService.register(registerUser);
    }
    @Throttle({default: { ttl: 1000, limit: 5 }})
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUser: RegisterUserDto) {
        return this.authService.login(loginUser);
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @HttpCode(HttpStatus.OK)
    getProfile(@Request() req:Record<string, string>) {
        return {
            message:"you are authenticated",
            user: req.result
        };
    }
}
