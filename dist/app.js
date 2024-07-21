"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions_1 = require("./swaggerOptions");
// ************************ Settings ************************
const app = (0, express_1.default)();
dotenv_1.default.config();
// ************************ Middlewares ************************
// To use body parser functionality to read and parse JSON in req.body
app.use(express_1.default.json());
// To work with cookies
app.use((0, cookie_parser_1.default)());
// To allow cross-origin requests (mainly for Swagger)
app.use((0, cors_1.default)({
    credentials: true,
}));
// To allow JSDoc validation
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swaggerOptions_1.options)));
// ************************ Routes ************************
const authRoutes_1 = __importDefault(require("./routes/v1/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/v1/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/v1/taskRoutes"));
// Using the routers created
app.use('/api', authRoutes_1.default);
app.use('/api/home', userRoutes_1.default);
app.use('/api/home/tasks', taskRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map