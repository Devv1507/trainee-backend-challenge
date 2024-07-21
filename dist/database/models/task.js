"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var Task_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = __importDefault(require("./user"));
/**
 * @swagger
 * components:
 *  schemas:
 *   Task:
 *    type: object
 *    properties:
 *     id:
 *      type: UUID
 *      description: The auto-generated id of the task
 *     userId:
 *      type: string
 *      description: Referenced id of the user who created the task
 *     taskN:
 *      type: string
 *      description: The number of the task based on user (start at 1 and increment by 1)
 *     title:
 *      type: string
 *      description: The title of task
 *     description:
 *      type: string
 *      description: Task description
 *     status:
 *      type: string
 *      description: Task status (pendiente -default, en proceso, completada)
 *     limitDate:
 *      type: date
 *      description: The limit date to complete the task
 *     createdAt:
 *      type: datatime
 *      description: The date and time when the task was created
 *     updatedAt:
 *      type: datatime
 *      description: The date and time when the task was last updated
 *    required:
 *     - title
 *     - description
 *     - limitDate
 *    example:
 *     id: d2d9fdfc-4025-4e4d-b0fb-416c2c55e994
 *     userId: b708a04d-71f9-41bb-8d7f-ba2d8d986abb
 *     taskN: 1
 *     title: Complete tasks management API
 *     description: A CRUD API for managing tasks of users with Typescript and Express
 *     status: pendiente
 *     limitDate: 2024-07-22
 *     createdAt: 2024-07-19 05:01:04.732 -0500
 *     updatedAt: 2024-07-19 05:01:25.030 -0500
 */
let Task = Task_1 = class Task extends sequelize_typescript_1.Model {
    static setTaskNextId(task, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const initTask = yield Task_1.findOne({
                where: { userId: task.userId },
                order: [['taskN', 'DESC']],
            });
            task.taskN = initTask ? initTask.taskN + 1 : 1;
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Task.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Task.prototype, "taskN", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(60),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        defaultValue: 'pendiente',
    }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Task.prototype, "limitDate", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Task.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Task, Object]),
    __metadata("design:returntype", Promise)
], Task, "setTaskNextId", null);
Task = Task_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'tasks',
        modelName: 'Task',
        timestamps: true,
    })
], Task);
exports.default = Task;
//# sourceMappingURL=task.js.map