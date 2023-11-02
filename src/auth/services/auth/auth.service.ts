import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/typeorm/entities/Auth';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private AuthRepository: Repository<Auth>,
  ) {}

  login(userId: number, accessToken: string, refreshToken: string) {
    const session = this.AuthRepository.create({
      user_id: userId,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    return this.AuthRepository.save(session);
  }

  logOut(accessToken: string, userId: number) {
    return this.AuthRepository.delete({ access_token: accessToken, user_id: userId });
  }

  logOutAllDeviceByUser(userId: number) {
    return this.AuthRepository.delete({ user_id: userId });
  }
}
