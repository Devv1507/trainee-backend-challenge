import { Handler } from 'express';

export const getTasks: Handler = async (req, res) => {
  res.send('Get all tasks');
};

export const addTask: Handler = async (req, res) => {
    res.send('Add a task');
};

export const updateTask: Handler = async (req, res) => {
    res.send('Update a task');
};

export const deleteTask: Handler = async (req, res) => {
    res.send('Delete a task');
};