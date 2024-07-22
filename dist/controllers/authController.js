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
exports.handleRefreshToken = exports.logOut = exports.logIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../database/models/user"));
const createToken_1 = require("../utils/createToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// ************************ Controller functions ************************
/**
 * Sign Up
 *
 * @function signUp
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.name - User's name.
 * @param {string} req.body.email - User's email.
 * @param {string} req.body.password - User's password.
 * @param {string} req.body.rePassword - User's password confirmation.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Creates a new user account with the provided details.
 * @throws {ConflictError} If the email is already registered.
 * @throws {ValidationError} If the input data is invalid.
 * @throws {Error} If there is a server error.
 */
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, rePassword } = req.body;
        const errors = [];
        // Check user from database with same email if any
        const existingEmail = yield user_1.default.findOne({
            where: { email },
        });
        if (existingEmail) {
            return res
                .status(409)
                .json({ message: 'El correo ingresado ya se encuentra registrado' });
        }
        // Null, empty or undefined constrains
        if (!name) {
            errors.push('Por favor añada un nombre para la cuenta');
        }
        if (!email) {
            errors.push('Por favor añada un email');
        }
        if (!password) {
            errors.push('Por favor añada una contraseña');
        }
        if (password != rePassword) {
            errors.push('Las contraseñas no coinciden, intente de nuevo');
        }
        // Check for errors first
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        // If no errors found, create new user
        const newUser = {
            name,
            email,
            password
        };
        const user = yield user_1.default.create(newUser);
        // Send success response
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            message: 'Cuenta creada satisfactoriamente',
        });
    }
    catch (error) {
        res.status(500).json(['Ha ocurrido un error al intentar crear el usuario']);
    }
});
exports.signUp = signUp;
/**
 * Log In
 *
 * @function logIn
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.email - User's email.
 * @param {string} req.body.password - User's password.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Authenticates a user and issues JWT tokens.
 * @throws {UnauthorizedError} If the email or password is incorrect.
 * @throws {Error} If there is a server error.
 */
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate the email
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json(['Email no encontrado. Por favor, intente de nuevo']);
        }
        // Checking if the passwords matchs
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Constraseña incorrecta' });
        }
        // If the password matchs, generate the tokens
        const accessToken = (0, createToken_1.assignJWT)(user, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRATION);
        const refreshToken = (0, createToken_1.assignJWT)(user, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRATION);
        // Save the refresh token in user to enhance refresh token security
        yield user.update({ refreshToken });
        // Save the refresh token in a browser cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 172000, // seconds
        });
        // Success response
        res.status(200).json({
            accessToken,
            message: 'Autenticación exitosa',
        });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Algo fue mal en el inicio de sesión' });
    }
});
exports.logIn = logIn;
/**
 * Log Out
 *
 * @function logOut
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Logs out the user by clearing the refresh token cookie.
 * @throws {Error} If there is a server error.
 */
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.sendStatus(204);
    }
    const userFound = yield user_1.default.findOne({ where: { refreshToken } });
    if (!userFound) {
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
        return res.sendStatus(204);
    }
    ;
    yield userFound.update({ refreshToken: '' });
    res.cookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
});
exports.logOut = logOut;
/**
 * Refresh Token logic
 *
 * @function handleRefreshToken
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Handles the refresh token logic, issuing a new access token if valid.
 * @throws {UnauthorizedError} If the refresh token is missing or invalid.
 * @throws {ForbiddenError} If the user is not authorized.
 * @throws {Error} If there is a server error.
 */
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
        return res.status(401).json({ message: 'Cookies sin token de refresco' });
    const userFound = yield user_1.default.findOne({ where: { refreshToken } });
    if (!userFound)
        return res.status(403).json('Token inválido');
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(401).json('El token ha expirado');
        if (userFound.id !== decoded.sub)
            return res.status(403).json('Acceso no autorizado');
        const accessToken = (0, createToken_1.assignJWT)(userFound, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRATION);
        res.status(201).json({ accessToken });
    }));
});
exports.handleRefreshToken = handleRefreshToken;
//# sourceMappingURL=authController.js.map