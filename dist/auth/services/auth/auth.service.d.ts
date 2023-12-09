import { Auth } from 'src/typeorm/entities/Auth';
import { Repository } from 'typeorm';
export declare class AuthService {
    private AuthRepository;
    constructor(AuthRepository: Repository<Auth>);
    login(userId: number, accessToken: string, refreshToken: string): Promise<Auth>;
    logOut(accessToken: string, userId: number): Promise<import("typeorm").DeleteResult>;
    logOutAllDeviceByUser(userId: number): Promise<import("typeorm").DeleteResult>;
}
