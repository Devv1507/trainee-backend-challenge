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
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    5XX:
 *     $ref: '#/components/responses/ServerError'
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
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    5XX:
 *     $ref: '#/components/responses/ServerError'
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
 *    204:
 *     description: The resource was deleted successfully.
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    5XX:
 *     $ref: '#/components/responses/ServerError'
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
 *    5XX:
 *     $ref: '#/components/responses/ServerError'
 */
router.put('/update/:id', checkAuth_1.checkToken, userController_1.updateUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map