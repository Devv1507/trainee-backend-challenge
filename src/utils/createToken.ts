import jwt from 'jsonwebtoken';

/**
 * @param {*} user - The user object with id item (string).
 */
export const assignJWT = (user: { id: string }, secret: string, time: string) => {
  const payload = {
    sub: user.id,
    iat: Date.now() / 1000,
  };

  const token = jwt.sign(payload, secret, { expiresIn: time });
  return token;
};
