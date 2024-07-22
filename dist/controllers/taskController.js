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
exports.deleteTask = exports.updateTask = exports.addTask = exports.getUserSingleTask = exports.getUserTasks = void 0;
const task_1 = __importDefault(require("../database/models/task"));
/**
 * Get all tasks for the authenticated user.
 *
 * @function getUserTasks
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Retrieves all tasks for the authenticated user, if not errors.
 * @throws {NotFoundError} If no task for the user is found.
 * @throws {Error} If there is a server error.
 */
const getUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.userId;
        const userTasks = yield task_1.default.findAll({ where: { userId: id } });
        if (userTasks.length === 0) {
            res.status(201).json({ success: true, message: 'Usted no tiene ninguna tarea pendiente' });
        }
        else {
            res.status(200).json({ success: true, message: userTasks });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.getUserTasks = getUserTasks;
/**
 * Get a single task for the authenticated user by task ID.
 *
 * @function getUserSingleTask
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - Task ID.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @throws {NotFoundError} If the task is not found.
 * @description Retrieves a single task for the authenticated user by task ID.
 */
const getUserSingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.userId;
        const taskN = req.params.id;
        const userTask = yield task_1.default.findOne({ where: { userId: id, taskN } });
        if (userTask === null) {
            return res.status(404).json({ success: false, message: 'La tarea no ha sido encontrada' });
        }
        res.status(200).json({ success: true, message: userTask });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.getUserSingleTask = getUserSingleTask;
/**
 * Add a new task for the authenticated user.
 *
 * @function addTask
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.title - Task title.
 * @param {string} req.body.description - Task description.
 * @param {string} req.body.limitDate - Task limit date.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Creates a new task for the authenticated user. Return validation errors if found.
 * @throws {ValidationError} If the request body is invalid.
 * @throws {Error} If there is a server error.
 */
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.userId;
    const { body } = req;
    console.log(body);
    // Validate fields on server-side (i.e. nulls)
    const errors = [];
    if (!body.title) {
        errors.push({ text: 'Por favor añada un título a la tarea' });
    }
    if (!body.description) {
        errors.push({ text: 'Se recomienda añadir una descripción' });
    }
    if (!body.limitDate) {
        errors.push({ text: 'Por favor añada la fecha límite de la tarea' });
    }
    // Check for errors
    if (errors.length > 0) {
        return res.status(400).json({ succes: false, message: errors });
    }
    try {
        // Save the task in DB
        const newTask = yield task_1.default.create(Object.assign(Object.assign({}, body), { userId: id }));
        res.status(201).json({ success: true, message: 'Se ha añadido la tarea satisfactoriamente', addedTask: newTask });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.addTask = addTask;
/**
 * Update an existing task for the authenticated user by task ID.
 *
 * @function updateTask
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - Task Number.
 * @param {Object} req.body - Request body.
 * @param {string} [req.body.title] - New task title
 * @param {string} [req.body.description] - New task description.
 * @param {string} [req.body.limitDate] - New task limit date.
 * @param {string} [req.body.status] - New task status.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Updates an existing task for the authenticated user by task number.
 * @throws {NotFoundError} If the user is not found.
 * @throws {ValidationError} If the request body is invalid.
 * @throws {Error} If there is a server error.
 */
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskN = req.params.id;
        const { body } = req;
        const targeTask = yield task_1.default.findOne({ where: { userId: res.locals.userId, taskN } });
        if (targeTask === null) {
            return res.status(404).json({ success: false, message: 'La tarea no ha sido encontrada' });
        }
        else {
            yield targeTask.update(body);
            res.json({ success: true, message: 'La tarea ha sido actualizada satisfactoriamente', });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.updateTask = updateTask;
/**
 * Delete an existing task for the authenticated user by task ID.
 *
 * @function deleteTask
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - Task ID.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Deletes an existing task for the authenticated user by task number.
 * @throws {NotFoundError} If the target task is not found.
 * @throws {Error} If there is a server error.
 */
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.userId;
        const taskN = req.params.id;
        const targeTask = yield task_1.default.findOne({ where: { userId: id, taskN } });
        if (targeTask === null) {
            return res.status(404).json({ success: false, message: 'La tarea no ha sido encontrada' });
        }
        else {
            yield targeTask.destroy();
            res.json({ success: true, message: 'Tarea eliminada' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map