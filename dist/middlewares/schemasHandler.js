"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
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
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json(error.errors.map(err => err.message));
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=schemasHandler.js.map