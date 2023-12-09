import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
export declare class UsersService {
    private UserRepository;
    constructor(UserRepository: Repository<User>);
    findUsers(): Promise<{
        id: any;
        registrationDate: any;
        lastLoginDate: any;
        username: any;
        hashedPassword: any;
        email: any;
        role: any;
        accountStatus: any;
        firstName: any;
        lastName: any;
        address: any;
    }[]>;
    findUserById(id: number): Promise<{
        id: any;
        registrationDate: any;
        lastLoginDate: any;
        username: any;
        hashedPassword: any;
        email: any;
        role: any;
        accountStatus: any;
        firstName: any;
        lastName: any;
        address: any;
    }>;
    findUserByUsername(username: string): Promise<{
        id: any;
        registrationDate: any;
        lastLoginDate: any;
        username: any;
        hashedPassword: any;
        email: any;
        role: any;
        accountStatus: any;
        firstName: any;
        lastName: any;
        address: any;
    }>;
    createUser(userDetails: CreateUserParams): Promise<User>;
    updateUser(id: number, userDetails: UpdateUserParams): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
