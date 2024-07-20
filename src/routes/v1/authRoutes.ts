import {Router} from 'express';
const router = Router();
// ************************ Controllers & Middlewares ************************
import {signUp, logIn, logOut} from '../../controllers/authController';
import {validateRequest} from '../../middlewares/schemasHandler';
import {registerSchema, logInSchema} from '../../validators/schemas/authSchemas';

// ************************ Public Routes ************************
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
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    201:
 *     description: User created successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
router.post('/sign-up', validateRequest(registerSchema), signUp);
// Log In
/**
 * @swagger
 * /api/login:
 *  post:
 */
router.post('/login', validateRequest(logInSchema), logIn);
// Log Out
/**
 * @swagger
 * /api/logout:
 *  get:
 */
router.get('/logout', logOut);

export default router;