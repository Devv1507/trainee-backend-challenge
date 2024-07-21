import { Router } from 'express';
const router = Router();

import { getUserTasks, addTask, updateTask, deleteTask } from '../../controllers/taskController';
import { checkToken } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/schemasHandler';
import { taskSchema } from '../../validators/schemas/taskSchemas';

// ************************ Private Routes ************************
// Get all user tasks
router.get('/all', checkToken, getUserTasks);
// Add a task
router.post('/add', validateRequest(taskSchema), checkToken, addTask);
// Update a task
router.put('/:id', checkToken, updateTask);
// Delete a task
router.delete('/:id', checkToken, deleteTask);

export default router;