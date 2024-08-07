import {z} from 'zod';

/**
 * Schema for the task form
 * @swagger
 * 
 * components:
 *  schemas:
 *   TaskRequest:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *      description: The title of the task
 *     description:
 *      type: string
 *      description: Task description
 *     limitDate:
 *      type: string
 *      description: The limit date to complete the task
 *    required:
 *     - title
 *     - description
 *     - limitDate
 *    example:
 *     title: Complete tasks management API
 *     description: A CRUD API for managing tasks of users with Typescript and Express
 *     limitDate: 2024-07-22
 */
export const taskSchema = z.object({
    title: z.string(
        {required_error: 'El título es requerido'}).max(60, 
            {message: 'El título no debe exceder los 60 caracteres'}),
    description: z.string(
        {required_error: 'Se requiere una descripción'}),
    limitDate: z.string(
        {required_error: 'Se debe agregar una fecha límite para la tarea'}).date(
            'Fecha inválida, por favor añada un formato similar a: 2024-07-18'),
});

/**
 * Schema for the update task form
 * @swagger
 * 
 * components:
 *  schemas:
 *   UpdateTaskRequest:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *      description: The title of the task
 *     description:
 *      type: string
 *      description: Task description
 *     limitDate:
 *      type: string
 *      description: The limit date to complete the task
 *     status:
 *      type: string
 *      description: The status of the task. Can only be changed to 'avanzando' or 'completada'.
 *    example:
 *     title: Tasks management API
 *     description: Simple CRUD API for managing tasks of users
 *     limitDate: 2024-12-22
 *     status: completada
 */
export const updateTaskSchema = z.object({
    title: z.string().max(60, {message: 'El título no debe exceder los 60 caracteres'}).optional(),
    description: z.string().optional(),
    limitDate: z.string().date('Fecha inválida, por favor añada un formato similar a: 2024-07-18').optional(),
    status: z.enum(['avanzando', 'completada']).optional()
});