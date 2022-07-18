import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import User from 'models/user';

const router = Router();

const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  req.login(user, { session: false }, async error => {
    if (error) return next(error);

    return res.json({ token: user.generateToken() });
  });
};

router.post('/register', passport.authenticate('register', { session: false }), handleLogin);
router.post('/login', passport.authenticate('login', { session: false }), handleLogin);

export default router;
