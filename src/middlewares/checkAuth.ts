import passportJwt from './passport-jwt';
import { Request, Response, NextFunction } from 'express';

// Define custom middleware function to handle unauthorized requests
export const checkIfAuthorized = (req: Request, res: Response, next: NextFunction) => {
  passportJwt.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err) return res.status(401).json('Sin token o token inválido');
    if (!user) return res.status(403).json('No autorizado');
    // Continue to the next middleware or route handler if authorized
    res.locals.userData = user;
    console.log(user);
    next();
  })(req, res, next);
};
