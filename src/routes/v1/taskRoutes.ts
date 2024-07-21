import { Router } from 'express';
const router = Router();

import { getUserTasks, getUserSingleTask, addTask, updateTask, deleteTask } from '../../controllers/taskController';
import { checkToken } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/schemasHandler';
import { taskSchema } from '../../schemas/taskSchemas';

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
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Task'
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.get('/all', checkToken, getUserTasks);

// Get a single task
/**
 * @swagger
 * /api/home/tasks/{id}:
 *  get:
 *   tags: [Task]
 *   summary: Get a single task of a user
 *   parameters:
 *    - $ref: '#/components/parameters/taskN'
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Object with the task
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', checkToken, getUserSingleTask);

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
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.post('/add', validateRequest(taskSchema), checkToken, addTask);
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
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', checkToken, updateTask);
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
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', checkToken, deleteTask);

export default router;