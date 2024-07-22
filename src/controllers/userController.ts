// ************************ Modules & Utils ************************
import { Handler } from 'express';
import User from '../database/models/user';
//const { issueJWT } = require('../libs/createToken');

// ************************ Controller functions ************************
// Get user by ID
export const getById: Handler = async (req, res) => {
  try {
    if (!res.locals.isAdmin) return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      }
    });
    if (user) {
      res.json({ success: true, message: user });
    } else {
      res.status(400).json('Usuario no encontrado');
    }
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Get all accounts
export const getAll: Handler = async (req, res) => {
  try {
    if (!res.locals.isAdmin) return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
    const users = await User.findAll();
    res.json({ success: true, message: users });
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Delete an account
export const deleteUser: Handler = async (req, res) => {
  try {
    if (!res.locals.isAdmin) return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
    const { id } = req.params;
    const target = await User.findByPk(id);
    if (target === null) {
      return res.status(404).json({ success: false, message: 'La cuenta no ha sido encontrada' });
    } else {
      await target.destroy();
      res.status(204).json('La cuenta específicada ha sido eliminada');
    }
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Update an account
export const updateUser: Handler = async (req, res) => {
  try {
    if (!res.locals.isAdmin) return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
    const { id } = req.params;
    const { body } = req;
    const target = await User.findByPk(id);
    if (target === null) {
      return res.status(404).json({ success: false, message: 'La cuenta no ha sido encontrada' });
    } else {
      const updated = await target.update(body);
      res.status(200).json(updated);
    }
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
