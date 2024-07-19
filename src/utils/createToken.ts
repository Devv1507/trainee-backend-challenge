import jwt from 'jsonwebtoken';

/**
 * @param {*} user - The user object.
 */
export const assignJWT = async (user: { id: any; email: any; }, secret: string, time: string) => {

    const payload = {
      sub: user.id,
      email: user.email,
      iat: Date.now(),
    };
  
    const signedToken = await jwt.sign(
        payload,
        secret,
        {expiresIn: time}
    );
    return signedToken;
};