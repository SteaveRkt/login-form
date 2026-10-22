import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { UsersController } from './users/users.controller.js';
import { UsersService } from './users/users.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
     {
      name:'short',
      ttl: 60,
      limit: 5
     },
     {
      name:'medium',
      ttl: 1000,
      limit: 20

     },
     {
      name:'long',
      ttl: 1000,
      limit: 50
     } 
  ]),
    DatabaseModule,
     UsersModule,
     AuthModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
