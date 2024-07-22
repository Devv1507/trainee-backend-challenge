"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../database/models/user"));
/**
 * Check Token
 *
 * @function checkToken
 * @param {Object} req - Express request object.
 * @param {Object} req.headers - Request headers.
 * @param {string} req.headers.authorization - Authorization header containing the JWT.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 * @description Middleware function that verifies the JWT and authorizes the user.
 * @throws {UnauthorizedError} If the authorization header is missing or the token is invalid.
 * @throws {ForbiddenError} If the token is invalid or expired.
 * @throws {Error} If there is a server error.
 */
const checkToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No se ha encontrado token de autenticación' });
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        console.log(decoded);
        const { sub } = decoded;
        const userFound = yield user_1.default.findByPk(sub, {
            attributes: {
                exclude: ['email', 'refreshToken', 'password'],
            }
        });
        if (!userFound) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        if (userFound.id === process.env.ADMIN_ID) {
            res.locals.isAdmin = true;
        }
        // Continue to the next middleware or route handler if authorized
        res.locals.userId = sub;
        next();
    }));
};
exports.checkToken = checkToken;
//# sourceMappingURL=checkAuth.js.map