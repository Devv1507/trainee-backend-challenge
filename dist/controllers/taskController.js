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
exports.deleteTask = exports.updateTask = exports.addTask = exports.getUserTasks = void 0;
const task_1 = __importDefault(require("../database/models/task"));
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
        yield task_1.default.create(Object.assign(Object.assign({}, body), { userId: id }));
        res.status(201).json({ success: true, message: 'Se ha añadido la tarea satisfactoriamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.addTask = addTask;
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
            res.json({ success: true, message: 'La tarea ha sido actualizada satisfactoriamente' });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.updateTask = updateTask;
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