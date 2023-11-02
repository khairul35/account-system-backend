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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const CreateUser_dto_1 = require("../../dto/CreateUser.dto");
const users_service_1 = require("../../services/users/users.service");
const bcrypt_1 = require("bcrypt");
const UpdateUser_dto_1 = require("../../dto/UpdateUser.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers() {
        const users = await this.userService.findUsers();
        return users;
    }
    async getUserById(id) {
        return await this.userService.findUserById(id);
    }
    async createUser(createUserDto) {
        const salt = 10;
        const hashedPassword = await (0, bcrypt_1.hash)(createUserDto.password, salt);
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
    async updateUserById(id, updateUserDto) {
        const params = {
            username: updateUserDto.username,
            email: updateUserDto.email,
            first_name: updateUserDto.firstName,
            last_name: updateUserDto.lastName,
            address: updateUserDto.address,
        };
        return await this.userService.updateUser(id, params);
    }
    async deleteUserById(id) {
        return await this.userService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map