const {Router} = require('express');
const router = Router();
// ************************ Controllers & Middlewares ************************
const {signUp, logIn, logOut} = require('../controllers/authController');

// ************************ Public Routes ************************
// Sign Up 
router.post('/sign-up',signUp);
// Log In
router.post('/login', logIn);
// Log Out
router.get('/logout', logOut);

module.exports = router;