// ************************ Modules & Utils ************************
import { Handler } from 'express';
import bcrypt from 'bcryptjs';
import User from '../database/models/user';
import { assignJWT } from '../utils/createToken';
import jwt from 'jsonwebtoken';

// ************************ Controller functions ************************
// ************************ Sign Up
/**
 * Retrieve request input data to create a new user
 * @async
 * @param name - User's name
 * @param email - User's email
 * @param password - User's password
 * @param rePassword - User's password confirmation
 * @response {object} - User's data
 */
export const signUp: Handler = async (req, res) => {
  try {
    const { name, email, password, rePassword } = req.body;
    const errors = [];
    // Check user from database with same email if any
    const existingEmail = await User.findOne({
      where: { email },
    });
    if (existingEmail) {
      return res
        .status(409)
        .json({ message: 'El correo ingresado ya se encuentra registrado' });
    }
    // Null, empty or undefined constrains
    if (!name) {
      errors.push('Por favor añada un nombre para la cuenta');
    }
    if (!email) {
      errors.push('Por favor añada un email');
    }
    if (!password) {
      errors.push('Por favor añada una contraseña');
    }
    if (password != rePassword) {
      errors.push('Las contraseñas no coinciden, intente de nuevo');
    }
    // Check for errors first
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    // If no errors found, create new user
    const newUser = {
      name,
      email,
      password
    };
    const user = await User.create(newUser);
    // Send success response
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      message: 'Cuenta creada satisfactoriamente',
    });
  } catch (error) {
    res.status(500).json(['Ha ocurrido un error al intentar crear el usuario']);
  }
};

// ************************ Log In 
/**
 * Authenticate user password based on hashed password and input password, then push a JWT token to cookie
 * @async
 * @param email - User's email
 * @param password - User's password
 */
export const logIn: Handler = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate the email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json(['Email no encontrado. Por favor, intente de nuevo']);
    }
    // Checking if the passwords matchs
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Constraseña incorrecta' });
    }
    // If the password matchs, generate the tokens
    const accessToken = await assignJWT(
      user, 
      process.env.ACCESS_TOKEN_SECRET as string, 
      process.env.ACCESS_TOKEN_EXPIRATION as string);
    const refreshToken = await assignJWT(user, 
      process.env.REFRESH_TOKEN_SECRET as string, 
      process.env.REFRESH_TOKEN_EXPIRATION as string);
    // Save the refresh token in a browser cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 172000, // seconds
    }); 
    // Success response
    res.status(200).json({
      accessToken,
      message: 'Autenticación exitosa',
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Algo fue mal en el inicio de sesión' });
  }
};
// ************************ Log Out
/**
 * Clear the refresh token cookie to log out the user
 * @async
 * @param res - Request object
 */
export const logOut: Handler = async (req, res) => {
  res.cookie('refreshToken', '', {
    maxAge: 0,
  });
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};
// ************************ Refresh Token logic
export const handleRefreshToken: Handler = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ message: 'No se encontró token de refresco' });
  
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err: any, decoded: any) => {
    if (err) return res.status(403).json('No se encontro token de refresco');
    const userFound = await User.findByPk(decoded.id);
    if (!userFound) return res.status(403).json('Token inválido');
    
    const accessToken = await assignJWT(
      userFound,
      process.env.ACCESS_TOKEN_SECRET as string,
      process.env.ACCESS_TOKEN_EXPIRATION as string
    );
    res.status(201).json({accessToken});
  });
};
