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
exports.updateAccount = exports.deleteAccount = exports.getAll = exports.getById = void 0;
const models_1 = __importDefault(require("../models"));
//const { issueJWT } = require('../libs/createToken');
// ************************ Controller functions ************************
// Get account by ID
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params; // req.userData ######################################
        const account = yield models_1.default.Account.findOne({
            where: { email },
            attributes: {
                exclude: ['password'],
            }
        });
        if (account) {
            res.json({ success: true, message: account, admin: res.locals.adminRole });
            //res.render('accounts/account-home', {account});
        }
        else {
            res.status(400).json('User not found');
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.getById = getById;
// Get all accounts
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield models_1.default.Account.findAll();
        if (accounts) {
            res.json({ success: true, message: accounts });
        }
        else {
            res.status(400).json('User not found');
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.getAll = getAll;
// Delete an account
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const target = yield models_1.default.Account.findByPk(id);
        yield target.destroy();
        //********************** */
        res.status(200).json('La cuenta específicada ha sido eliminada');
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.deleteAccount = deleteAccount;
// Update an account
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const target = yield models_1.default.Account.findByPk(id);
        const { body } = req;
        const updated = yield target.update(body);
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.updateAccount = updateAccount;
