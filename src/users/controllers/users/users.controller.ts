import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { hash } from 'bcrypt';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    /** process hashed password with using bcrypt */
    const salt = 10;
    const hashedPassword = await hash(createUserDto.password, salt);

    /** Add all processed data into params and map data correctly */
    const params = {
      username: createUserDto.username,
      password_hash: hashedPassword,
      email: createUserDto.email,
      role: 'user',
      account_status: 'active',
      registration_date: new Date(),
      last_login_date: null,
      first_name: createUserDto.firstName,
      last_name: createUserDto.lastName,
      address: createUserDto.address,
    };

    this.userService.createUser(params);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    /** Add all processed data into params and map data correctly */
    const params = {
      username: updateUserDto.username,
      email: updateUserDto.email,
      first_name: updateUserDto.firstName,
      last_name: updateUserDto.lastName,
      address: updateUserDto.address,
    };

    return await this.userService.updateUser(id, params);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
