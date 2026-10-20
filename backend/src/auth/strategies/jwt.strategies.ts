import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "../../users/users.service.js";
// @ts-expect-error passport-jwt does not provide type declarations in this project.
import { ExtractJwt, Strategy } from "passport-jwt";

export interface JwtPayload {
    sub: number;
    email: string;

}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    async validate(payload: JwtPayload) {
        const user = await this.usersService.findOneById(payload.sub);
        if (!user) {
            throw new Error('User not found');
        }
        const { password, ...result } = user;
        return result;
    }
}