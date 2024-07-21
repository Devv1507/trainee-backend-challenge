"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const taskController_1 = require("../../controllers/taskController");
const checkAuth_1 = require("../../middlewares/checkAuth");
const schemasHandler_1 = require("../../middlewares/schemasHandler");
const taskSchemas_1 = require("../../validators/schemas/taskSchemas");
// ************************ Private Routes ************************
// Get all user tasks
/**
 * @swagger
 * /api/home/tasks/all:
 *  get:
 *   tags: [Task]
 *   summary: Get all tasks of a user
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Object with the tasks of the particular user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 */
router.get('/all', checkAuth_1.checkToken, taskController_1.getUserTasks);
// Add a task
/**
 * @swagger
 * /api/home/tasks/add:
 *  post:
 *   tags: [Task]
 *   summary: Add a new task
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/TaskRequest'
 *   responses:
 *    200:
 *     description: Object with the new task
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 */
router.post('/add', (0, schemasHandler_1.validateRequest)(taskSchemas_1.taskSchema), checkAuth_1.checkToken, taskController_1.addTask);
// Update a task
/**
 * @swagger
 * /api/home/tasks/update/{id}:
 *  put:
 *   tags: [Task]
 *   summary: Update a task
 *   parameters:
 *    - $ref: '#/components/parameters/taskN'
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/TaskRequest'
 *   responses:
 *    200:
 *     description: Object with the updated task
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 */
router.put('/:id', checkAuth_1.checkToken, taskController_1.updateTask);
// Delete a task
/**
 * @swagger
 * /api/home/tasks/delete/{id}:
 *  delete:
 *   tags: [Task]
 *   summary: Delete a task
 *   parameters:
 *    - $ref: '#/components/parameters/taskN'
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Object with the deleted task
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 */
router.delete('/:id', checkAuth_1.checkToken, taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=taskRoutes.js.map