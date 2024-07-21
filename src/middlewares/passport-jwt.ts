import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../database/models/user';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET as string,
};

passport.use(
  new Strategy(options, async (jwt_payload: { sub: string }, done: (err: any, decoded: boolean | User ) => void) => {
    try {
      if (jwt_payload === null) return done('error', false);
      const user = await User.findByPk(jwt_payload.sub, {
        attributes: {
          exclude: ['name','password'],
        }
      });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;