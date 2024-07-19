// ************************ Modules & Utils ************************
import { Handler } from 'express';
import User from '../database/models/user';
//const { issueJWT } = require('../libs/createToken');

// ************************ Controller functions ************************
// Get account by ID
export const getById: Handler = async (req, res) => {
  try {
    const { id } = req.params; // req.userData ######################################
    const account = await User.findOne({ where: { id },
      attributes: {
        exclude: ['password'],
      }
    });
    if (account) {
      res.json({ success: true, message: account, admin: res.locals.adminRole });
      //res.render('accounts/account-home', {account});
    } else {
      res.status(400).json('User not found');
    }
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Get all accounts
export const getAll: Handler = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.json({ success: true, message: users });
    } else {
      res.status(400).json('User not found');
    }
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Delete an account
export const deleteUser: Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const target = await User.findByPk(id);
    //await target.destroy();
    //********************** */
    res.status(200).json('La cuenta específicada ha sido eliminada');
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Update an account
export const updateUser: Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const target = await User.findByPk(id);
    const { body } = req;
    //const updated = await target.update(body);
    //res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
