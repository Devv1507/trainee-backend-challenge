import {Router} from 'express';
const router = Router();
// ************************ Controllers & Middlewares ************************
import {signUp, logIn, logOut, handleRefreshToken} from '../../controllers/authController';
import {validateRequest} from '../../middlewares/schemasHandler';
import {registerSchema, logInSchema} from '../../validators/schemas/authSchemas';
import {checkToken} from '../../middlewares/checkAuth';

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
 *  schemas:
 *   UnauthorizedRequest:
 *    description: API key is missing or invalid
 *    headers:
 *     WWW_Authenticate:
 *      schema:
 *       type: string
 *        
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
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       items:
 *        message:
 *         type: string
 *         example: 'Ha ocurrido un error al intentar crear el usuario'
 */
router.post('/sign-up', validateRequest(registerSchema), signUp);
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
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       items:
 *        message:
 *         type: string
 *         example: 'Algo fue mal en el inicio de sesión'
 */
router.post('/login', validateRequest(logInSchema), logIn);
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
 *    200:
 *     description: User logged out successfully
 *     content:
 *      application/json:
 *       items:
 *        message:
 *         type: string
 *         example: 'Cierre de sesión exitoso'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       items:
 *        error:
 *         type: object
 */
router.post('/logout', checkToken, logOut);
// Refresh Token
/**
 * @swagger
 * /api/refresh-token:
 *  get:
 *   tags: [Auth]
 *   summary: Refresh the token
 *   responses:
 *    200:
 *     description: Token refreshed successfully
 *     content:
 *      application/json:
 *       items:
 *        accessToken: 
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ZmM2MjNmOC03NjVlLTRjMjctODJiOS04N2NkM2QzODdkMGIiLCJpYXQiOjE3MjE1MzQ5MDcuNjg0LCJleHAiOjE3MjE1MzU4MDd9.pHcEd8H6yai_aOAp1kYv_ERZtdjp-z9YscK_XpESnCQ
 */
router.get('/refresh-token', handleRefreshToken);

export default router;