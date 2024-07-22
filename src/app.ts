import express, { Express} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { options } from './swaggerOptions';

// ************************ Settings ************************
const app: Express = express();

// ************************ Middlewares ************************
// To use body parser functionality to read and parse JSON in req.body
app.use(express.json());
// To work with cookies
app.use(cookieParser());
// To allow cross-origin requests (mainly for Swagger)
app.use(cors(
    {
        credentials: true,
    }
));
// To allow JSDoc validation

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));

// ************************ Routes ************************
import v1AuthRouter from './routes/v1/authRoutes';
import v1UserRouter from './routes/v1/userRoutes';
import v1TaskRouter from './routes/v1/taskRoutes';

// Using the routers created
app.use('/api', v1AuthRouter);
app.use('/api/home', v1UserRouter);
app.use('/api/home/tasks', v1TaskRouter);

export default app;