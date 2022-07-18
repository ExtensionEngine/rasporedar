import { NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from 'models/user';

const router = Router();

// fix for passport types
// using any because passport definitely typed uses any
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/passport/index.d.ts#L28

interface Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login(user: User, options: any, done: (err: any) => void): void;
}

interface Response {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json(payload: any): void;
}

const handleAuth = (strategy: string) => async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(strategy, async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error(
          'The user name or password are incorrect. This is easily corrected by typing the correct user name and password.',
        );

        return next(error);
      }

      req.login(user, { session: false }, async error => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY || '');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

router.post('/register', handleAuth('register'));
router.post('/login', handleAuth('login'));

export default router;
