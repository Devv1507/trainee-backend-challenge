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
exports.userPayload = void 0;
const supertest_1 = __importDefault(require("supertest"));
const createToken_1 = require("../utils/createToken");
const app_1 = __importDefault(require("../app"));
const user_1 = __importDefault(require("../database/models/user"));
exports.userPayload = {
    id: "8aeec202-bac9-409e-aff4-d60680898b2b",
    email: "marcos@gmail.com",
    password: "adcadc",
};
jest.mock('../database/models/user');
jest.mock('../database/models/task');
describe("tasks routes", () => {
    describe("get user by id", () => {
        describe("when no access token are provided", () => {
            it("should return an 401 unauthorize response", () => __awaiter(void 0, void 0, void 0, function* () {
                const taskId = '50';
                yield (0, supertest_1.default)(app_1.default).get(`/api/home/tasks/${taskId}`).expect(401);
            }));
        });
        describe("when access token is provided but no task exist", () => {
            it("should return an 404 not found response", () => __awaiter(void 0, void 0, void 0, function* () {
                const taskId = '50';
                const userTarget = yield user_1.default.findOne({ where: { email: exports.userPayload.email } });
                if (!userTarget) {
                    throw new Error("User not found");
                }
                const token = (0, createToken_1.assignJWT)({ id: userTarget.id }, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRATION);
                yield (0, supertest_1.default)(app_1.default).get(`/api/home/tasks/${taskId}`).set("Authorization", `Bearer ${token}`).expect(404);
            }));
        });
    });
});
//# sourceMappingURL=task.test.js.map