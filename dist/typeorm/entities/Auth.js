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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const typeorm_1 = require("typeorm");
let Auth = class Auth {
};
exports.Auth = Auth;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Auth.prototype, "session_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Auth.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Auth.prototype, "access_token", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Auth.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => `DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 MONTH)` }),
    __metadata("design:type", Date)
], Auth.prototype, "expired_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Auth.prototype, "created_at", void 0);
exports.Auth = Auth = __decorate([
    (0, typeorm_1.Entity)({ name: 'Auths' })
], Auth);
//# sourceMappingURL=Auth.js.map