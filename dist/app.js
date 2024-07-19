"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// ************************ Settings ************************
const app = (0, express_1.default)();
dotenv_1.default.config();
// ************************ Middlewares ************************
// Middleware to use body parser functionality to read and parse JSON in req.body
app.use(express_1.default.json());
// ************************ Routes ************************
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// import v1UserRouter from './routes/usersRoutes';
// Using the routers created
app.use('/api', authRoutes_1.default);
// app.use('/api/home', v1UserRouter);
exports.default = app;
