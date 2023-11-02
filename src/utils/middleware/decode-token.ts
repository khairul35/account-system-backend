import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = 'i_dont_have_the_secret_key';

interface DecodedToken {
  id: number;
  username: string;
  email: string;
  role: string;
  accountStatus: string;
  firstName: string;
  lastName: string;
  lastLoginDate: number;
}

interface DecodedRefreshToken {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  lastLoginDate: number;
  accessToken?: string; // The accessToken property is optional
}

export function decodeAccessToken(token: string): DecodedToken | null {
    try {
        if (!token) throw new HttpException('No Access Token', HttpStatus.UNAUTHORIZED)
        const decoded: DecodedToken = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
};

export function decodeRefreshToken(token: string): DecodedRefreshToken | null {
    try {
        if (!token) throw new HttpException('No Access Token', HttpStatus.UNAUTHORIZED)
        const decoded: DecodedToken = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
}
