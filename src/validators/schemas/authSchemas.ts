import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string(
        {required_error: 'El nombre de la cuenta es requerido'}),
    email: z.string(
        {required_error: 'El correo es requerido'}).email(
            {message: 'Correo inválido'}),
    password: z.string(
        {required_error: 'La contraseña es requerida'}).min(6, 
            {message: 'La contraseña debe ser de mínimo 6 carácteres'
    }),
    rePassword: z.string({
        required_error: 'La contraseña de verificación es requerida'
    })
});

export const logInSchema = z.object({
    email: z.string({
        required_error: 'El correo es requerido'}).email(
            {message: 'Correo inválido'}),
    password: z.string({
        required_error: 'La contraseña es requerida'}).min(6, 
            {message: 'La contraseña es de mínimo 6 carácteres'
    })
});