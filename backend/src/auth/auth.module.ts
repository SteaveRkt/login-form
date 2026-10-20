import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module.js';
import { JwtStrategy } from './strategies/jwt.strategies.js';

@Module({
  imports:[UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' ,
      signOptions: {expiresIn: '1h'},
    secret: process.env.JWT_SECRET

})],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
