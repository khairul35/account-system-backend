"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../services/auth/auth.service");
const users_service_1 = require("../../../users/services/users/users.service");
const bcrypt_1 = require("bcrypt");
const jwt = require("jsonwebtoken");
const LogIn_dto_1 = require("../../dto/LogIn.dto");
const decode_token_1 = require("../../../utils/middleware/decode-token");
const RefreshToken_dto_1 = require("../../dto/RefreshToken.dto");
const SECRET_KEY = 'i_dont_have_the_secret_key';
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(loginCredential) {
        const initialUser = await this.userService.findUserByUsername(loginCredential.username);
        if (!initialUser?.id)
            throw new common_1.HttpException('Wrong Username!', common_1.HttpStatus.UNAUTHORIZED);
        const isPasswordPassed = await new Promise((resolve, reject) => {
            (0, bcrypt_1.compare)(loginCredential.password, initialUser.hashedPassword, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
        if (!isPasswordPassed)
            throw new common_1.HttpException('Wrong Password!', common_1.HttpStatus.UNAUTHORIZED);
        const accessToken = await jwt.sign({
            id: initialUser.id,
            username: initialUser.username,
            email: initialUser.email,
            role: initialUser.role,
            accountStatus: initialUser.accountStatus,
            firstName: initialUser.firstName,
            lastName: initialUser.lastName,
            lastLoginDate: Date.now(),
        }, SECRET_KEY, { expiresIn: '60m' });
        const refreshToken = await jwt.sign({
            id: initialUser.id,
            username: initialUser.username,
            firstName: initialUser.firstName,
            lastName: initialUser.lastName,
            lastLoginDate: Date.now(),
            accessToken,
        }, SECRET_KEY);
        await this.authService.login(initialUser.id, accessToken, refreshToken);
        const result = {
            lastLoginDate: initialUser.lastLoginDate,
            accessToken,
            refreshToken,
        };
        return result;
    }
    ;
    async refreshToken(body) {
        const decoded = (0, decode_token_1.decodeAccessToken)(body.refreshToken);
        const user = await this.userService.findUserById(decoded.id);
        const accessToken = await jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            accountStatus: user.accountStatus,
            firstName: user.firstName,
            lastName: user.lastName,
            lastLoginDate: Date.now(),
        }, SECRET_KEY, { expiresIn: '60m' });
        const newRefreshToken = await jwt.sign({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            lastLoginDate: Date.now(),
            accessToken,
        }, SECRET_KEY);
        await this.authService.login(user.id, accessToken, newRefreshToken);
        const result = {
            lastLoginDate: user.lastLoginDate,
            accessToken,
            newRefreshToken,
        };
        return result;
    }
    ;
    async logOut(accessToken) {
        const decoded = (0, decode_token_1.decodeAccessToken)(accessToken);
        await this.authService.logOut(accessToken, decoded.id);
        return 'Successfully Logged Out';
    }
    ;
    async logOutAllDevice(accessToken) {
        const decoded = (0, decode_token_1.decodeAccessToken)(accessToken);
        await this.authService.logOutAllDeviceByUser(decoded.id);
        return 'Successfully Logged Out';
    }
    ;
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LogIn_dto_1.LogInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RefreshToken_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Post)('logout/all-device'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOutAllDevice", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map