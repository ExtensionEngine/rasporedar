import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { makeError } from 'helpers/error';
import passport from 'passport';
import User from 'models/user';

export const registerStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      if (await User.findOne({ where: { email } })) {
        return done(makeError('User already exists', 401), null);
      }

      const user = await User.create({ email, password });

      return done(null, user, { message: 'Signed up successfully' });
    } catch (error) {
      return done(error);
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
        return done(makeError('User not found', 404), null);
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(makeError('Wrong password', 401), null);
      }

      return done(null, user, { message: 'Logged in successfully' });
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
  (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      return done(error);
    }
  },
);

export const passportInitializeStrategies = () => {
  passport.use('register', registerStrategy);
  passport.use('login', loginStrategy);
  passport.use(jwtStrategy);
};
