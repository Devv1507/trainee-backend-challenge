import {Router} from 'express';
const router = Router();
// ************************ Controllers & Middlewares ************************
import { getById, getAll, updateUser, deleteUser } from '../../controllers/userController';
import { checkToken } from '../../middlewares/checkAuth';

// ************************ Private Routes ************************
// Get all users  - admin
/**
 * @swagger
 * /api/home/all:
 *  get:
 *   tags: [User]
 *   summary: Get all users
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Object with all users
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.get('/all', checkToken,  getAll);

// Get my user - any
/**
 * @swagger
 * /api/home/{id}:
 *  get:
 *   tags: [User]
 *   summary: Get user by id
 *   parameters:
 *    - $ref: '#/components/parameters/userId'
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Object with the user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', checkToken, getById);

// Delete user - admin
/**
 * @swagger
 * /api/home/delete/{id}:
 *  delete:
 *   tags: [User]
 *   summary: Delete user by id
 *   parameters:
 *    - $ref: '#/components/parameters/userId'
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    204:
 *     description: The resource was deleted successfully.
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', checkToken,  deleteUser);

// Update user information - any
/**
 * @swagger
 * /api/home/update/{id}:
 *  put:
 *   tags: [User]
 *   summary: Update user information
 *   parameters:
 *     - $ref: '#/components/parameters/userId'
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    204:
 *     description: The resource was updated successfully.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.put('/update/:id', checkToken, updateUser);

export default router;
