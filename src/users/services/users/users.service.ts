import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { UserMapper } from '../../mapper/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async findUsers() {
    return (await this.UserRepository.find()).map(UserMapper);
  }

  async findUserById(id: number) {
    return UserMapper(await this.UserRepository.findOne({ where: { id } }));
  }

  async findUserByUsername(username: string) {
    return UserMapper(await this.UserRepository.findOne({ where: { username } }));
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.UserRepository.create({ ...userDetails });
    return this.UserRepository.save(newUser);
  }

  updateUser(id: number, userDetails: UpdateUserParams) {
    const updatedUser = this.UserRepository.update({ id }, { ...userDetails });
    return updatedUser;
  }

  deleteUser(id: number) {
    return this.UserRepository.delete({ id });
  }
}
