import { Module } from '@nestjs/common';
import {AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/typeorm/entities/Auth';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
