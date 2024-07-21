"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @param {*} user - The user object with id item (string).
 */
const assignJWT = (user, secret, time) => {
    const payload = {
        sub: user.id,
        iat: Date.now() / 1000,
    };
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: time });
    return token;
};
exports.assignJWT = assignJWT;
//# sourceMappingURL=createToken.js.map