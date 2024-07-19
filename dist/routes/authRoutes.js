"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// ************************ Controllers & Middlewares ************************
const { signUp, logIn, logOut } = require('../controllers/authController');
// ************************ Public Routes ************************
// Sign Up 
router.post('/sign-up', signUp);
// Log In
router.post('/login', logIn);
// Log Out
router.get('/logout', logOut);
exports.default = router;
