const models = require('../models');
// ************************ Modules & Utils ************************
//const { issueJWT } = require('../libs/createToken');
const jwt = require('jsonwebtoken');

// ************************ Controller functions ************************
// ************************ Sign Up
const signUp = async (req, res) => {
  try {
    const { name, email, password, rePassword } = req.body;
    const errors = [];
    // Check user from database with same email if any
    const existingEmail = await models.User.findOne({
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
    // Hash password
    const passwordHashed = await models.User.encryptPassword(password);
    // Create new user
    const newUser = {
      name,
      email,
      passwordHashed
    };
    const user = await models.User.create(newUser);
    // Sign the token and give it to the employee
    //******************** */
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      message: 'Cuenta creada satisfactoriamente',
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json(['Error creating user']); // More user-friendly error message
  }
};

// ************************ Log In 
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate the email
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json(['Email no encontrado. Por favor, intente de nuevo']);
    }
    // Checking if the passwordS matchs
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Constraña inválida' });
    }
    // Create the token
    ///***   */
    // Save the token in a cookie

    // Response
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      message: 'Autenticación exitosa',
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Something went wrong' });
  }
};
// ************************ Log Out
const logOut = async (req, res) => {
  console.log('Log Out');
};

module.exports = {
  signUp,
  logIn,
  logOut,
};
