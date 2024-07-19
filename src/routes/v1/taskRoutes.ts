import { Router } from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../../controllers/taskController';

const router = Router();

// ************************ Public Routes ************************
// Get all tasks
router.get('/tasks', getTasks);
// Add a task
router.post('/tasks', addTask);
// Update a task
router.put('/tasks/:id', updateTask);
// Delete a task
router.delete('/tasks/:id', deleteTask);