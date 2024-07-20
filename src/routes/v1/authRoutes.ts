import {Router} from 'express';
const router = Router();
// ************************ Controllers & Middlewares ************************
import {signUp, logIn, logOut} from '../../controllers/authController';
import {validateRequest} from '../../middlewares/schemasHandler';
import {registerSchema, logInSchema} from '../../validators/schemas/authSchemas';

// ************************ Public Routes ************************
// Sign Up
/**
 * @openapi
 * /api/sign-up:
 *  post:
 *   tags:
 *    - User
 *   summary: Register a new user
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
router.post('/login', validateRequest(logInSchema), logIn);
// Log Out
router.get('/logout', logOut);

export default router;