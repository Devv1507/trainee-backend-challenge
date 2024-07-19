import { Handler } from 'express';
import Task from '../database/models/task';

export const getUserTasks: Handler = async (req, res) => {
    try {
        const { id } = req.params; 
        const userTasks = await Task.findAll({where: { userId: id }});
        if (userTasks.length === 0) {
            res.status(201).json({ success: true, message: 'Usted no tiene ninguna tarea pendiente' });
            res.redirect('/api/v1/home/');
        } else {
            res.status(200).json({ success: true, message: userTasks });
        }
      } catch (error: any) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
      }
};

export const addTask: Handler = async (req, res) => {
    const { body } = req;
    const { id } = res.locals.userData;
    
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
          body,
          userId: id
        });
        res.status(201).json({ success: true, message: 'Se ha añadido la tarea satisfactoriamente' });
      } catch (error: any) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
      }
};

export const updateTask: Handler = async (req, res) => {
    res.send('Update a task');
};

export const deleteTask: Handler = async (req, res) => {
    res.send('Delete a task');
};