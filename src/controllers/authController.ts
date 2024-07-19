// ************************ Modules & Utils ************************
import { Handler } from 'express';
import bcrypt from 'bcryptjs';
import User from '../database/models/user';
import { assignJWT } from '../utils/createToken';

// ************************ Controller functions ************************
// ************************ Sign Up
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
      return res.status(400).json({ message: 'Constraseña inválida' });
    }
    // If the password matchs, sign the token and give it to the user
    const accessToken = await assignJWT(user, process.env.ACCESS_TOKEN_SECRET as string, process.env.ACCESS_TOKEN_EXPIRATION as string);
    const refreshToken = await assignJWT(user, process.env.REFRESH_TOKEN_SECRET as string, process.env.REFRESH_TOKEN_EXPIRATION as string);
    // Update the user's refresh token
    await user.update({refreshToken});
    // Save the refresh token in a browser cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1 * 20 * 60 * 1000, // (hours * minutes * seconds * ms)
    }); 
    // Success response
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
      message: 'Autenticación exitosa',
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Algo fue mal en el inicio de sesión' });
  }
};
// ************************ Log Out
export const logOut = async (req: Request, res: Response) => {
  console.log('Log Out');
};
