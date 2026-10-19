import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Role, User } from './entity/user.entity.js';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto.js';
const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}
    async createUser(createUser:CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUser.password, SALT_ROUNDS);
        return this.databaseService.user.create({
            data: {
                name: createUser.name,
                email: createUser.email,
                password: hashedPassword,
                role: createUser.role ? createUser.role : Role.USER,
            },  
        });
    
}   
    findAll(role?:string): Promise<User[]> {
        if (role) {
            return this.databaseService.user.findMany({
                where: { role: role as Role },
            });
        }
        return this.databaseService.user.findMany();
    }
    findOneById(id:number): Promise<User | null> {
        return this.databaseService.user.findUnique({
            where: { id },
        });
    }
    findOneByEmail(email:string): Promise<User | null> {
        return this.databaseService.user.findUnique({
            where: { email },
        });
    }
    async updateUser(id:number, updateUser:UpdateUserDto): Promise<User> {
        let hashedPassword: string | undefined;
        if (updateUser.password) {
            hashedPassword = await bcrypt.hash(updateUser.password, SALT_ROUNDS);
        }
        return this.databaseService.user.update({
            where: { id },
            data: {
                ...updateUser,
                password: hashedPassword ?? undefined,
                role: updateUser.role ?? undefined,
            },
        });
    }
    deleteUser(id:number): Promise<User> {
        return this.databaseService.user.delete({
            where: { id },
        });

}
}
 
