import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): Promise<import("../../../typeorm/entities/User").User[]>;
    getUserById(id: number): Promise<import("../../../typeorm/entities/User").User>;
    createUser(createUserDto: CreateUserDto): Promise<void>;
    updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUserById(id: number): Promise<import("typeorm").DeleteResult>;
}
