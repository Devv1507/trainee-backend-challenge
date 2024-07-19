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
