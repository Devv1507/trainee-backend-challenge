import { Router } from 'express';
const router = Router();

import { getUserTasks, addTask, updateTask, deleteTask } from '../../controllers/taskController';
import { checkToken } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/schemasHandler';
import { taskSchema } from '../../validators/schemas/taskSchemas';

// ************************ Private Routes ************************
// Get all user tasks
router.get('/tasks', checkToken, getUserTasks);
// Add a task
router.post('/tasks/add', validateRequest(taskSchema), checkToken, addTask);
// Update a task
router.put('/tasks/:id', checkToken, updateTask);
// Delete a task
router.delete('/tasks/:id', checkToken, deleteTask);

export default router;