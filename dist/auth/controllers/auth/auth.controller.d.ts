import { AuthService } from 'src/auth/services/auth/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { LogInDto } from 'src/auth/dto/LogIn.dto';
import { RefreshTokenDto } from 'src/auth/dto/RefreshToken.dto';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    login(loginCredential: LogInDto): Promise<{
        lastLoginDate: any;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(body: RefreshTokenDto): Promise<{
        lastLoginDate: any;
        accessToken: string;
        newRefreshToken: string;
    }>;
    logOut(accessToken: string): Promise<string>;
    logOutAllDevice(accessToken: string): Promise<string>;
}
