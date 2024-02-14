"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const bcrypt = require("bcryptjs");
class PasswordService {
    async encrypt(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
exports.PasswordService = PasswordService;
//# sourceMappingURL=password.service.js.map