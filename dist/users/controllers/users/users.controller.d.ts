import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): Promise<{
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
    getUserById(id: number): Promise<{
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
    createUser(createUserDto: CreateUserDto): Promise<void>;
    updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUserById(id: number): Promise<import("typeorm").DeleteResult>;
}
