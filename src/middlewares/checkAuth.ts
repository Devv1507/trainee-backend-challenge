import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/models/user';

// Define custom middleware function to handle unauthorized requests
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: 'No se ha encontrado token de autenticación'});
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    console.log(decoded);
    const { sub } = decoded;
    const userFound = User.findByPk(sub, {
      attributes: {
        exclude: ['name','email','refreshToken','password'],
      }
    });
    if (!userFound) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    console.log(userFound);
    // Continue to the next middleware or route handler if authorized
    res.locals.userId = sub;
    next();
  });
};
