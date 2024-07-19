import { Router } from 'express';
const router = Router();

import { getTasks, addTask, updateTask, deleteTask } from '../../controllers/taskController';
import { checkIfAuthorized } from '../../middlewares/checkAuth';

// ************************ Private Routes ************************
// Get all user tasks
router.get('/tasks', checkIfAuthorized, getTasks);
// Add a task
router.post('/tasks', checkIfAuthorized, addTask);
// Update a task
router.put('/tasks/:id', checkIfAuthorized, updateTask);
// Delete a task
router.delete('/tasks/:id', checkIfAuthorized, deleteTask);

export default router;