import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import errorMessages from 'consts/errorMessages';
import { Strategy as LocalStrategy } from 'passport-local';
import { makeError } from 'helpers/error';
import passport from 'passport';
import status from 'http-status';
import User from 'models/user';

export const registerStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      if (await User.findOne({ where: { email } })) {
        return done(makeError(errorMessages.AUTH_USER_EXISTS, status.BAD_REQUEST), null);
      }

      const user = await User.create({ email, password });

      return done(null, user);
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
      const user = await User.unscoped().findOne({ where: { email } });

      if (!user) {
        return done(makeError(errorMessages.AUTH_USER_NOT_FOUND, status.NOT_FOUND), null);
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(makeError(errorMessages.AUTH_WRONG_PASSWORD, status.BAD_REQUEST), null);
      }

      return done(null, user);
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
      const { id } = token.user as User;
      const user = await User.findByPk(id);

      if (!user) {
        return done(makeError('User does not exist', status.UNAUTHORIZED), null);
      }

      return done(null, user);
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
