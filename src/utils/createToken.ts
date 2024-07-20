import jwt from 'jsonwebtoken';

/**
 * @param {*} user - The user object.
 */
export const assignJWT = async (user: { id: string}, secret: string, time: string) => {

    const payload = {
      sub: user.id,
      iat: Date.now() / 1000,
    };
  
    const token = await jwt.sign(
        payload,
        secret,
        {expiresIn: time}
    );
    return token;
};