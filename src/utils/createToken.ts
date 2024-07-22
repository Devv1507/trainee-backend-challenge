import jwt from 'jsonwebtoken';

/**
 * Generate a JSON Web Token (JWT) for a user.
 * 
 * @function assignJWT
 * @param {Object} user - User object.
 * @param {string} user.id - Unique identifier of the user.
 * @param {string} secret - Secret key used to sign the JWT.
 * @param {string} time - Expiration time for the JWT (e.g., '1h', '7d').
 * @returns {string} - The generated JWT token.
 * @description Creates a JWT token using the user ID as the subject and includes a timestamp (iat). 
 * The token is signed using the provided secret key and has an expiration time specified by the `time` parameter.
 */
export const assignJWT = (user: { id: string }, secret: string, time: string) => {
  const payload = {
    sub: user.id,
    iat: Date.now() / 1000,
  };

  const token = jwt.sign(payload, secret, { expiresIn: time });
  return token;
};
