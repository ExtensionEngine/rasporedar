import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import User from 'models/user';

export const registerStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email: string, password: string, done) => {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { email, password },
      });

      if (!created) {
        return done(null, false, { message: 'User already exists.' });
      }

      return done(null, user, { message: 'Signed up Successfully' });
    } catch (error) {
      done(error);
    }
  },
);

export const loginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(null, false, { message: 'Wrong Password' });
      }

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error);
    }
  },
);

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  },
);

export const passportInitializeStrategies = () => {
  passport.use('register', registerStrategy);
  passport.use('login', loginStrategy);
  passport.use(jwtStrategy);
};
