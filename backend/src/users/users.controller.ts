import { Controller, Get, HttpCode, NotFoundException, Query,Param,Post,Body, ParseIntPipe, BadRequestException, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post()
    @HttpCode(201)
    async createUser(@Body() createUser: CreateUserDto) {
        const response = await this.usersService.createUser(createUser);
        if(!response) {
            throw new BadRequestException('Could not create user');
        }
        return response;
    }

    @Get()
    @HttpCode(200)
    async getAllUsers(@Query('role') role?: string) {
        const response = await this.usersService.findAll(role)
        if(!response) {
            throw new NotFoundException('No users found');
        }
        return response;
    }
    @Get(':id')
    @HttpCode(200)
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        const response = await this.usersService.findOneById(id);
        if(!response) {
            throw new NotFoundException(`User not found`);
        }
        return response;
    }
    @Patch(':id')
    @HttpCode(200)
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUser: UpdateUserDto) {
        const response = await this.usersService.updateUser(id, updateUser);
        if(!response) {
            throw new NotFoundException(`User not found`);
        }
        return response;
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        const response = await this.usersService.deleteUser(id);
        if(!response) {
            throw new NotFoundException(`User not found`);
        }
        return response;
    }
}
