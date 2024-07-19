import passportJwt from './passport-jwt';
import { Request, Response, NextFunction } from 'express';
import User from '../database/models/user';
import jwt from 'jsonwebtoken';
import { Handler } from 'express';

// Define custom middleware function to handle unauthorized requests
export const checkIfAuthorized = (req: Request, res: Response, next: NextFunction) => {
  passportJwt.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (err || !user) {
      // Redirect to login route if unauthorized
      return res.status(401).json('No autorizado')
    }
    // Continue to the next middleware or route handler if authorized
    res.locals.userData = user;
    next();
  })(req, res, next);
};

/**
 * @DESC Verify JWT from authorization header Middleware
 * Checks if the provided JWT token is valid
 * (token is different for every session login by users and expires after 1800 minutes)
 */
export const validate: Handler = async (req, res, next) => {
    try {
      // Check if authorization header exists
      if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authorization header is missing' });
      }
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET as string);
      res.locals.userData = decodedToken;
      const {email} = res.locals.userData;
      const user = await User.findOne({where: {email}});
      if (!user) {
        return res.status(404).json('User not found in the database')
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: 'Invalid or expired token provided',
        error: error,
      });
    }
  };