import jwt from 'jsonwebtoken';

/**
 * @param {*} user - The user object.
 */
export const assignJWT = async (user: { id: any}, secret: string, time: string) => {

    const payload = {
      sub: user.id,
      iat: Date.now(),
    };
  
    const token = await jwt.sign(
        payload,
        secret,
        {expiresIn: time}
    );
    return token;
};