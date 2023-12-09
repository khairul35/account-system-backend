"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const UserMapper = (data) => {
    return {
        id: data?.id || null,
        registrationDate: data?.registration_date || null,
        lastLoginDate: data?.last_login_date || null,
        username: data?.username || null,
        hashedPassword: data?.password_hash || null,
        email: data?.email || null,
        role: data?.role || null,
        accountStatus: data?.account_status || null,
        firstName: data?.first_name || null,
        lastName: data?.last_name || null,
        address: data?.address || null,
    };
};
exports.UserMapper = UserMapper;
//# sourceMappingURL=User.js.map