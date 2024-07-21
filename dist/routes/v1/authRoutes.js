"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// ************************ Controllers & Middlewares ************************
const authController_1 = require("../../controllers/authController");
const schemasHandler_1 = require("../../middlewares/schemasHandler");
const authSchemas_1 = require("../../validators/schemas/authSchemas");
const checkAuth_1 = require("../../middlewares/checkAuth");
// ************************ Public Routes ************************
/**
 * @swagger
 * components:
 *
 *  parameters:
 *   userId:
 *    in: path
 *    name: id
 *    description: Id of the user
 *    required: true
 *    schema:
 *     type: string
 *   taskN:
 *    in: path
 *    name: id
 *    description: Integer of specific task of a user
 *    required: true
 *    schema:
 *     type: integer
 *
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *    description: Authorization header with JWT token
 *
 *  responses:
 *   UnauthorizedError:
 *    description: Access token is missing or invalid
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Error'
 *   NotFound:
 *    description: The specified resource was not found
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Error'
 *   AuthBadRequest:
 *    description: Bad request
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Error'
 *   Forbidden:
 *    description: The user does not have the necessary permissions for a resource
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Error'
 *   InternalServerError:
 *    description: Internal server error
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Error'
 *
 *  schemas:
 *   Error:
 *    type: object
 *    properties:
 *     code:
 *      type: string
 *     message:
 *      type: string
 *    required:
 *     - message
 */
// Sign Up
/**
 * @swagger
 * /api/sign-up:
 *  post:
 *   tags: [User]
 *   summary: Register a new user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/RegisterRequest'
 *   responses:
 *    201:
 *     description: User created successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *      description: Bad request
 *      content:
 *       application/json:
 *        items:
 *         errors:
 *          type: array
 *          example: ['Por favor añada un nombre para la cuenta', 'Por favor añada un email', 'Por favor añada una contraseña', 'Las contraseñas no coinciden, intente de nuevo']
 *    5XX:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.post('/sign-up', (0, schemasHandler_1.validateRequest)(authSchemas_1.registerSchema), authController_1.signUp);
// Log In
/**
 * @swagger
 * /api/login:
 *  post:
 *   tags: [Auth]
 *   summary: Log in to the application
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/LogInRequest'
 *   responses:
 *    200:
 *     description: User logged in successfully
 *     content:
 *      application/json:
 *       items:
 *        id:
 *         type: string
 *         example: b708a04d-71f9-41bb-8d7f-ba2d8d986abb
 *        name:
 *         type: string
 *         example: Marcos
 *        email:
 *         type: string
 *         example: marcos@gmail.com
 *        message:
 *         type: string
 *         example: 'Autenticación exitosa'
 *    400:
 *     description: Bad request
 *     content:
 *      application/json:
 *       items:
 *        errors:
 *         type: array
 *         example: ['Email no encontrado. Por favor, intente de nuevo', 'Constraseña incorrecta']
 *    5XX:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.post('/login', (0, schemasHandler_1.validateRequest)(authSchemas_1.logInSchema), authController_1.logIn);
// Log Out
/**
 * @swagger
 * /api/logout:
 *  post:
 *   tags: [Auth]
 *   summary: Log out of the application
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    204:
 *     description: User logged out successfully
 *    5XX:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.post('/logout', checkAuth_1.checkToken, authController_1.logOut);
// Refresh Token
/**
 * @swagger
 * /api/refresh-token:
 *  get:
 *   tags: [Auth]
 *   summary: Refresh the token
 *   responses:
 *    201:
 *     description: Token refreshed successfully
 *     content:
 *      application/json:
 *       items:
 *        accessToken:
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ZmM2MjNmOC03NjVlLTRjMjctODJiOS04N2NkM2QzODdkMGIiLCJpYXQiOjE3MjE1MzQ5MDcuNjg0LCJleHAiOjE3MjE1MzU4MDd9.pHcEd8H6yai_aOAp1kYv_ERZtdjp-z9YscK_XpESnCQ
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    5XX:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.get('/refresh-token', authController_1.handleRefreshToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map