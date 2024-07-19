import {Router} from 'express';
const router = Router();
// ************************ Controllers & Middlewares ************************
import {signUp, logIn, logOut} from '../../controllers/authController';
import {validateRequest} from '../../middlewares/schemasHandler';
import {registerSchema, logInSchema} from '../../validators/schemas/authSchemas';

// ************************ Public Routes ************************
// Sign Up 
router.post('/sign-up', validateRequest(registerSchema), signUp);
// Log In
router.post('/login', validateRequest(logInSchema), logIn);
// Log Out
router.get('/logout', logOut);

export default router;