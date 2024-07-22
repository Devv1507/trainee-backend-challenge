import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';


/**
 * Validate Request
 * 
 * @function validateRequest
 * @param {ZodSchema} schema - Zod schema to validate the request body.
 * @returns {Function} - Middleware function to validate the request body against the provided schema.
 * @description Middleware function that validates the request body using a Zod schema.
 * @throws {ValidationError} If the request body is invalid.
 * @throws {Error} If there is a server error.
 */
export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json(error.errors.map(err => err.message));
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
