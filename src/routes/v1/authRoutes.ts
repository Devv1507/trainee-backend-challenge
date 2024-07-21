import {Router} from 'express';
const router = Router();
// ************************ Controllers & Middlewares ************************
import {signUp, logIn, logOut} from '../../controllers/authController';
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
 * 
 *  securitySchemes:
 *   cookieAuth:
 *    type: apiKey
 *    in: cookie
 *    name: refreshToken
 *    description: The refresh token to authenticate
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
 *    - cookieAuth: []
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

export default router;