import {
  Body,
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LogInDto } from 'src/auth/dto/LogIn.dto';
import { decodeAccessToken } from 'src/utils/middleware/decode-token';
import { RefreshTokenDto } from 'src/auth/dto/RefreshToken.dto';

const SECRET_KEY = 'i_dont_have_the_secret_key';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Post('login')
  async login(@Body() loginCredential: LogInDto) {
    const initialUser = await this.userService.findUserByUsername(loginCredential.username);
    if (!initialUser?.id) throw new HttpException('Wrong Username!', HttpStatus.UNAUTHORIZED);
  
    const salt = 10;
    const isPasswordPassed = await compare(loginCredential.password, salt);
    if (!isPasswordPassed) throw new HttpException('Wrong Password!', HttpStatus.UNAUTHORIZED);

    /** Generate Access Token expired every 1 hour */
    const accessToken = await jwt.sign(
      {
        id: initialUser.id,
        username: initialUser.username,
        email: initialUser.email,
        role: initialUser.role,
        accountStatus: initialUser.accountStatus,
        firstName: initialUser.firstName,
        lastName: initialUser.lastName,
        lastLoginDate: Date.now(),
      },
      SECRET_KEY,
      { expiresIn: '60m' },
    );

    /** Generate Refresh Token */
    const refreshToken = await jwt.sign(
      {
        id: initialUser.id,
        username: initialUser.username,
        firstName: initialUser.firstName,
        lastName: initialUser.lastName,
        lastLoginDate: Date.now(),
        accessToken,
      },
      SECRET_KEY,
    );
  
    await this.authService.login(initialUser.id, accessToken, refreshToken);

    const result = {
      lastLoginDate: initialUser.lastLoginDate,
      accessToken,
      refreshToken,
    };
    return result;
  };

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    const decoded = decodeAccessToken(body.refreshToken);
    const user = await this.userService.findUserById(decoded.id);

    /** Generate Access Token expired every 1 hour */
    const accessToken: string = await jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
        firstName: user.firstName,
        lastName: user.lastName,
        lastLoginDate: Date.now(),
      },
      { expiresIn: '60m' },
    );

    /** Generate Refresh Token */
    const newRefreshToken: string = await jwt.sign(
      {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        lastLoginDate: Date.now(),
        accessToken,
      },
    );

    await this.authService.login(user.id, accessToken, newRefreshToken);

    const result = {
      lastLoginDate: user.lastLoginDate,
      accessToken,
      newRefreshToken,
    };
    return result;
  };

  @Post('logout')
  async logOut(@Headers('authorization') accessToken: string) {
    const decoded = decodeAccessToken(accessToken);
    await this.authService.logOut(accessToken, decoded.id);
    return 'Successfully Logged Out';
  };

  @Post('logout/all-device')
  async logOutAllDevice(@Headers('authorization') accessToken: string) {
    const decoded = decodeAccessToken(accessToken);
    await this.authService.logOutAllDeviceByUser(decoded.id);
    return 'Successfully Logged Out';
  };

}