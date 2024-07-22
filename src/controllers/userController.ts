// ************************ Modules & Utils ************************
import { Handler } from 'express';
import User from '../database/models/user';
//const { issueJWT } = require('../libs/createToken');

// ************************ Controller functions ************************
/**
 * Get user by ID.
 * 
 * @function getById
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - User ID.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Retrieves a user by their ID, excluding the password field.
 * @throws {ForbiddenError} If the user does not have admin privileges.
 * @throws {NotFoundError} If the user is not found.
 * @throws {Error} If there is a server error.
 */
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

/**
 * Get all accounts.
 * 
 * @function getAll
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Retrieves all user accounts.
 * @throws {ForbiddenError} If the user does not have admin privileges.
 * @throws {Error} If there is a server error.
 */
export const getAll: Handler = async (req, res) => {
  try {
    if (!res.locals.isAdmin) return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
    const users = await User.findAll();
    res.json({ success: true, message: users });
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};

/**
 * Delete an account.
 * 
 * @function deleteUser
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - User ID.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @description Deletes a user account by their ID.
 * @throws {ForbiddenError} If the user does not have admin privileges.
 * @throws {NotFoundError} If the user is not found.
 * @throws {Error} If there is a server error.
 */
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

/**
 * Update an account.
 * 
 * @function updateUser
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - User ID.
 * @param {Object} req.body - Request body.
 * @returns {void}
 * @description Updates a user account by their ID.
 * @throws {ForbiddenError} If the user does not have admin privileges.
 * @throws {NotFoundError} If the user is not found.
 * @throws {Error} If there is a server error.
 */
export const updateUser: Handler = async (req, res) => {
  try {
    if (!res.locals.isAdmin) return res.status(403).json({ success: false, message: 'No tienes permisos para realizar esta acción' });
    const { id } = req.params;
    const { body } = req;
    const target = await User.findByPk(id);
    if (target === null) {
      return res.status(404).json({ success: false, message: 'La cuenta no ha sido encontrada' });
    } else {
      await target.update(body);
      res.status(200).json({success: false, message: 'Se han aplicado las actualizaciones', updateUser: target});
    }
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
