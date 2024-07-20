import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../database/models/user';

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['refreshToken'];
      }
      return token;
    }
  ]),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET as string,
};

passport.use(
  new Strategy(options, async (jwt_payload: { id: any ;email: any; }, done: (arg0: unknown, arg1: boolean | User | undefined, arg2: { message: string; } | undefined) => any) => {
    try {
      const user = await User.findByPk(jwt_payload.id, {
        attributes: {
          exclude: ['password'],
        }
      });
      if (user) return done(null, user, {message: 'Usuario válido'});
      return done(null, false, {message: 'No se ha encontrado al usuario'});
    } catch (error) {
      return done(null, undefined, {message: `${error}`});
    }
  })
);

export default passport;