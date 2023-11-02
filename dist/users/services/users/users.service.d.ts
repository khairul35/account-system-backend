import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
export declare class UsersService {
    private UserRepository;
    constructor(UserRepository: Repository<User>);
    findUsers(): Promise<User[]>;
    findUserById(id: number): Promise<User>;
    createUser(userDetails: CreateUserParams): Promise<User>;
    updateUser(id: number, userDetails: UpdateUserParams): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
