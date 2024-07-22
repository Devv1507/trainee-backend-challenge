import { Handler } from 'express';
import Task from '../database/models/task';


/**
 * Get all tasks for the authenticated user.
 * 
 * @function getUserTasks
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Retrieves all tasks for the authenticated user, if not errors.
 * @throws {NotFoundError} If no task for the user is found.
 * @throws {Error} If there is a server error.
 */
export const getUserTasks: Handler = async (req, res) => {
    try {
        const id = res.locals.userId; 
        const userTasks = await Task.findAll({where: { userId: id }});
        if (userTasks.length === 0) {
            res.status(404).json({ success: false, message: 'Usted no tiene ninguna tarea pendiente' });
        } else {
            res.status(200).json({ success: true, message: userTasks });
        }
      } catch (error: any) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
      }
};

/**
 * Get a single task for the authenticated user by task counter.
 * 
 * @function getUserSingleTask
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.taskN - Number of the task of a specific user. Starts at 1 and increment by one.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @throws {NotFoundError} If the task is not found.
 * @description Retrieves a single task for the authenticated user by task counter.
 */
export const getUserSingleTask: Handler = async (req, res) => {
    try {
        const id = res.locals.userId;
        const taskN = req.params.taskN;
        const userTask = await Task.findOne({ where: { userId: id, taskN } });
        if (userTask === null) {
          return res.status(404).json({ success: false, message: 'La tarea no ha sido encontrada' });
        }
        res.status(200).json({ success: true, message: userTask });
      } catch (error: any) {
        res.status(500).send({ success: false, message: error.message });
      }
};

/**
 * Add a new task for the authenticated user.
 * 
 * @function addTask
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.title - Task title.
 * @param {string} req.body.description - Task description.
 * @param {string} req.body.limitDate - Task limit date.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Creates a new task for the authenticated user. Return validation errors if found.
 * @throws {ValidationError} If the request body is invalid.
 * @throws {Error} If there is a server error.
 */
export const addTask: Handler = async (req, res) => {
    const id = res.locals.userId;
    const { body } = req;
    console.log(body);
    // Validate fields on server-side (i.e. nulls)
    const errors = [];
    if (!body.title) {
      errors.push({ text: 'Por favor añada un título a la tarea' });
    }
    if (!body.description) {
      errors.push({ text: 'Se recomienda añadir una descripción' });
    }
    if (!body.limitDate) {
      errors.push({ text: 'Por favor añada la fecha límite de la tarea' });
    }
    // Check for errors
    if (errors.length > 0) {
      return res.status(400).json({ succes: false, message: errors });
    }
    try {
        // Save the task in DB
        const newTask = await Task.create({
          ...body,
          userId: id
        });
        res.status(201).json({ success: true, message: 'Se ha añadido la tarea satisfactoriamente', addedTask: newTask });
      } catch (error: any) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
      }
};

/**
 * Update an existing task for the authenticated user by task ID.
 * 
 * @function updateTask
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.taskN - Number of the task of a specific user. Starts at 1 and increment by one.
 * @param {Object} req.body - Request body.
 * @param {string} [req.body.title] - New task title
 * @param {string} [req.body.description] - New task description.
 * @param {string} [req.body.limitDate] - New task limit date.
 * @param {string} [req.body.status] - New task status.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Updates an existing task for the authenticated user by task number.
 * @throws {NotFoundError} If the user is not found.
 * @throws {ValidationError} If the request body is invalid.
 * @throws {Error} If there is a server error.
 */
export const updateTask: Handler = async (req, res) => {
    try {
        const taskN = req.params.taskN;
        const { body } = req;
        const targeTask = await Task.findOne({where: { userId: res.locals.userId, taskN }});
        if (targeTask === null) {
            return res.status(404).json({ success: false, message: 'La tarea no ha sido encontrada' });
            }
        else {
            await targeTask.update(body);
            res.json({ success: true, message: 'La tarea ha sido actualizada satisfactoriamente',  });
        }
      } catch (error:any) {
        res.status(500).send({ success: false, message: error.message });
      }
};

/**
 * Delete an existing task for the authenticated user by task ID.
 * 
 * @function deleteTask
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.taskN - Number of the task of a specific user. Starts at 1 and increment by one.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Deletes an existing task for the authenticated user by task number.
 * @throws {NotFoundError} If the target task is not found.
 * @throws {Error} If there is a server error.
 */
export const deleteTask: Handler = async (req, res) => {
    try {
        const id = res.locals.userId;
        const taskN = req.params.taskN;
        const targeTask = await Task.findOne({ where: { userId: id, taskN } });
        if (targeTask === null) {
          return res.status(404).json({ success: false, message: 'La tarea no ha sido encontrada' });
        }
        else {
            await targeTask.destroy();
            res.json({ success: true, message: 'Tarea eliminada' });
        }
      } catch (error: any) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
      }
};