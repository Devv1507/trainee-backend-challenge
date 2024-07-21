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
// Define custom middleware function to handle unauthorized requests
const checkToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({ message: 'No se ha encontrado token de autenticación' });
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
        console.log(decoded);
        const { sub } = decoded;
        const userFound = yield user_1.default.findByPk(sub, {
            attributes: {
                exclude: ['email', 'refreshToken', 'password'],
            }
        });
        console.log(userFound === null || userFound === void 0 ? void 0 : userFound.dataValues);
        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Continue to the next middleware or route handler if authorized
        res.locals.userId = sub;
        next();
    }));
};
exports.checkToken = checkToken;
//# sourceMappingURL=checkAuth.js.map