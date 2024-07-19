import {z} from 'zod';

export const taskSchema = z.object({
    title: z.string(
        {required_error: 'El título es requerido'}),
    limitDate: z.string(
        {required_error: 'Se debe agregar una fecha límite para la tarea'}).date(
            'Fecha inválida, por favor añada un formato similar a: 2024-07-18'),
});