import { Handler } from 'express';
import Task from '../database/models/task';

export const getUserTasks: Handler = async (req, res) => {
    try {
        const id = res.locals.userId; 
        const userTasks = await Task.findAll({where: { userId: id }});
        if (userTasks.length === 0) {
            res.status(201).json({ success: true, message: 'Usted no tiene ninguna tarea pendiente' });
        } else {
            res.status(200).json({ success: true, message: userTasks });
        }
      } catch (error: any) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
      }
};

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
        await Task.create({
          ...body,
          userId: id
        });
        res.status(201).json({ success: true, message: 'Se ha añadido la tarea satisfactoriamente' });
      } catch (error: any) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
      }
};

export const updateTask: Handler = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { body } = req;
        const targeTask = await Task.findOne({where: { userId: res.locals.userId, id: taskId }});
        if (targeTask === null) {
            return res.status(404).json({ success: false, message: 'La tarea no ha sido encontrada' });
            }
        else {
            await targeTask.update(body);
            res.json({ success: true, message: 'La tarea ha sido actualizada satisfactoriamente' });
        }
      } catch (error:any) {
        res.status(500).send({ success: false, message: error.message });
      }
};

export const deleteTask: Handler = async (req, res) => {
    try {
        const id = res.locals.userId;
        const taskId = req.params.id;
        const targeTask = await Task.findOne({ where: { userId: id, id: taskId } });
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