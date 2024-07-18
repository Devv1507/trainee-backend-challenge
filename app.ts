import express, { Express} from 'express';
// ************************ Settings ************************
const app: Express = express();

// ************************ Middlewares ************************
// Middleware to use body parser functionality to read and parse JSON in req.body
app.use(express.json());

// ************************ Routes ************************
import v1AuthRouter from './routes/authRoutes.js';
// import v1UserRouter from './routes/usersRoutes';

// Using the routers created
app.use('/api', v1AuthRouter);
// app.use('/api/home', v1UserRouter);

export default app;