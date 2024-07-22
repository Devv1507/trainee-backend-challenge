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
exports.updateUser = exports.deleteUser = exports.getAll = exports.getById = void 0;
const user_1 = __importDefault(require("../database/models/user"));
//const { issueJWT } = require('../libs/createToken');
// ************************ Controller functions ************************
/**
 * Get user by ID.
 *
 * @function getById
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - User ID.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Retrieves a user by their ID, excluding the password field.
 * @throws {ForbiddenError} If the user does not have admin privileges.
 * @throws {NotFoundError} If the user is not found.
 * @throws {Error} If there is a server error.
 */
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!res.locals.isAdmin)
            return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
        const { id } = req.params;
        const user = yield user_1.default.findByPk(id, {
            attributes: {
                exclude: ['password'],
            }
        });
        if (user) {
            res.json({ success: true, message: user });
        }
        else {
            res.status(400).json('Usuario no encontrado');
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.getById = getById;
/**
 * Get all accounts.
 *
 * @function getAll
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Retrieves all user accounts.
 * @throws {ForbiddenError} If the user does not have admin privileges.
 * @throws {Error} If there is a server error.
 */
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!res.locals.isAdmin)
            return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
        const users = yield user_1.default.findAll();
        res.json({ success: true, message: users });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.getAll = getAll;
/**
 * Delete an account.
 *
 * @function deleteUser
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - User ID.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Deletes a user account by their ID.
 * @throws {ForbiddenError} If the user does not have admin privileges.
 * @throws {NotFoundError} If the user is not found.
 * @throws {Error} If there is a server error.
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!res.locals.isAdmin)
            return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
        const { id } = req.params;
        const target = yield user_1.default.findByPk(id);
        if (target === null) {
            return res.status(404).json({ success: false, message: 'La cuenta no ha sido encontrada' });
        }
        else {
            yield target.destroy();
            res.status(204).json('La cuenta específicada ha sido eliminada');
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.deleteUser = deleteUser;
/**
 * Update an account.
 *
 * @function updateUser
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - User ID.
 * @param {Object} req.body - Request body.
 * @returns {void}
 * @description Updates a user account by their ID.
 * @throws {ForbiddenError} If the user does not have admin privileges.
 * @throws {NotFoundError} If the user is not found.
 * @throws {Error} If there is a server error.
 */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!res.locals.isAdmin)
            return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
        const { id } = req.params;
        const { body } = req;
        const target = yield user_1.default.findByPk(id);
        if (target === null) {
            return res.status(404).json({ success: false, message: 'La cuenta no ha sido encontrada' });
        }
        else {
            yield target.update(body);
            res.status(200).json({ success: false, message: 'Se han aplicado las actualizaciones', updateUser: target });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map