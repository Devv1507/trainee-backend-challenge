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
exports.logOut = exports.logIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = __importDefault(require("../models"));
//const { issueJWT } = require('../libs/createToken');
// ************************ Controller functions ************************
// ************************ Sign Up
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, rePassword } = req.body;
        const errors = [];
        // Check user from database with same email if any
        const existingEmail = yield models_1.default.User.findOne({
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
        // Hash password
        const passwordHashed = yield models_1.default.User.encryptPassword(password);
        // Create new user
        const newUser = {
            name,
            email,
            passwordHashed
        };
        const user = yield models_1.default.User.create(newUser);
        // Sign the token and give it to the employee
        //******************** */
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            message: 'Cuenta creada satisfactoriamente',
        });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json(['Error creating user']); // More user-friendly error message
    }
});
exports.signUp = signUp;
// ************************ Log In 
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate the email
        const user = yield models_1.default.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json(['Email no encontrado. Por favor, intente de nuevo']);
        }
        // Checking if the passwordS matchs
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Constraña inválida' });
        }
        // Create the token
        ///***   */
        // Save the token in a cookie
        // Response
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            message: 'Autenticación exitosa',
        });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.logIn = logIn;
// ************************ Log Out
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Log Out');
});
exports.logOut = logOut;
