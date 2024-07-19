import express, { Express} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from './middlewares/passport-jwt';

// ************************ Settings ************************
const app: Express = express();

// ************************ Middlewares ************************
// To use body parser functionality to read and parse JSON in req.body
app.use(express.json());
// To initialize passport
app.use(passport.initialize());
// To work with cookies
app.use(cookieParser());

// ************************ Routes ************************
import v1AuthRouter from './routes/v1/authRoutes';
import v1UserRouter from './routes/v1/userRoutes';
import v1TaskRouter from './routes/v1/taskRoutes';

// Using the routers created
app.use('/api', v1AuthRouter);
app.use('/api/home', v1UserRouter);
app.use('/api/home/task', v1TaskRouter);

export default app;