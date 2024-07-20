import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../database/models/user';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET as string,
};

passport.use(
  new Strategy(options, async (jwt_payload: { id: any }, done: (err: unknown, decoded: boolean | User ) => any) => {
    try {
      const user = await User.findByPk(jwt_payload.id, {
        attributes: {
          exclude: ['password'],
        }
      });
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;