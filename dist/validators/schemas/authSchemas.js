"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for the registration form
 * @swagger
 *
 * components:
 *  schemas:
 *   RegisterRequest:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      description: The name of the user
 *     email:
 *      type: string
 *      description: The email of the user
 *     password:
 *      type: string
 *      description: The password of the user
 *     rePassword:
 *      type: string
 *      description: Password confirmation
 *    required:
 *     - name
 *     - email
 *     - password
 *     - rePassword
 *    example:
 *     name: Marcos
 *     email: marcos@gmail.com
 *     password: adcadc
 *     rePassword: adcadc
 */
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'El nombre de la cuenta es requerido' }),
    email: zod_1.z.string({ required_error: 'El correo es requerido' }).email({ message: 'Correo inválido' }),
    password: zod_1.z.string({ required_error: 'La contraseña es requerida' }).min(6, { message: 'La contraseña debe ser de mínimo 6 carácteres'
    }),
    rePassword: zod_1.z.string({
        required_error: 'La contraseña de verificación es requerida'
    })
});
/**
 * Schema for the login form
 * @swagger
 * components:
 *  schemas:
 *   LogInRequest:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: The email of the user
 *     password:
 *      type: string
 *      description: The password of the user
 *    required:
 *     - email
 *     - password
 *    example:
 *     email: marcos@gmail.com
 *     password: adcadc
 */
exports.logInSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: 'El correo es requerido'
    }).email({ message: 'Correo inválido' }),
    password: zod_1.z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, { message: 'La contraseña es de mínimo 6 carácteres'
    })
});
//# sourceMappingURL=authSchemas.js.map