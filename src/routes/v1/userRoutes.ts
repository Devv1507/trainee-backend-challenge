import {Router} from 'express';
const router = Router();
// ************************ Controllers & Middlewares ************************
import { getById, getAll, updateUser, deleteUser } from '../../controllers/userController';
import { checkIfAuthorized } from '../../middlewares/checkAuth';

// ************************ Private Routes ************************
// Needed previous authentication to get all user account information
// Get all users  - admin
router.get('/all', checkIfAuthorized,  getAll);
// Get my user - any
router.get('/', checkIfAuthorized, getById);
// Delete user - admin
router.delete('/:id', checkIfAuthorized,  deleteUser);
// Update user information - any
router.put('/update/:id', checkIfAuthorized, updateUser);

export default router;
