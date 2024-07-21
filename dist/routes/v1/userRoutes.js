"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// ************************ Controllers & Middlewares ************************
const userController_1 = require("../../controllers/userController");
const checkAuth_1 = require("../../middlewares/checkAuth");
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
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UnauthorizedRequest'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       items:
 *        message:
 *         type: string
 *         example: 'Ha ocurrido un error al intentar obtener los usuarios'
 */
router.get('/all', checkAuth_1.checkToken, userController_1.getAll);
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
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UnauthorizedRequest'
 */
router.get('/:id', checkAuth_1.checkToken, userController_1.getById);
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
 *    200:
 *     description: Object with the user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UnauthorizedRequest'
 */
router.delete('/:id', checkAuth_1.checkToken, userController_1.deleteUser);
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
 *    200:
 *     description: Object with the user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UnauthorizedRequest'
 */
router.put('/update/:id', checkAuth_1.checkToken, userController_1.updateUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map