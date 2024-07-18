const express = require('express');
// ************************ Settings ************************
const app = express();

// ************************ Middlewares ************************
// Middleaware to use body parser functionality to read and parse JSON in req.body
app.use(express.json());

// ************************ Routes ************************
const v1AuthRouter = require('./routes/authRoutes.js');
//const v1UserRouter = require('./routes/usersRoutes.js');

// Using the routers created
app.use('/api', v1AuthRouter);
//app.use('/api/home/', v1UserRouter);

module.exports = app;