import {Router} from 'express';
const router = Router();
// ************************ Controllers & Middlewares ************************
import { getById, getAll, updateUser, deleteUser } from '../../controllers/userController';
import { checkIfAuthorized } from '../../middlewares/checkAuth';

// ************************ Private Routes ************************
// Get all users  - admin
/**
 * @swagger
 * /api/home/all:
 *  get:
 *   tags: [User]
 *   summary: Get all users
 *   responses:
 *    200:
 *     description: Object with all users
 *     content:
 *      application/json:
 *     schema:
 *      $ref: '#/components/schemas/User'
 */
router.get('/all', checkIfAuthorized,  getAll);
// Get my user - any
/**
 * @swagger
 * /api/home/{id}:
 *  get:
 *   tags: [User]
 *   summary: Get user by id
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Id of the user
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Object with the user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
router.get('/:id', checkIfAuthorized, getById);
// Delete user - admin
/**
 * @swagger
 * /api/home/delete/{id}:
 *  delete:
 *   tags: [User]
 *   summary: Delete user by id
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Id of the user
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Object with the user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
router.delete('/:id', checkIfAuthorized,  deleteUser);
// Update user information - any
/**
 * @swagger
 * /api/home/update/{id}:
 *  put:
 *   tags: [User]
 *   summary: Update user information
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Id of the user
 *      schema:
 *       type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *     description: Object with the user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
router.put('/update/:id', checkIfAuthorized, updateUser);

export default router;
