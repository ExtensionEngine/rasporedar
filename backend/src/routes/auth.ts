import { Request, Response, Router } from 'express';
import passport from 'passport';
import User from 'models/user';

const router = Router();

const handleLogin = (req: Request, res: Response) => {
  const user = req.user as User;
  return res.json({ token: user.generateToken() });
};

router.post('/register', passport.authenticate('register', { session: false }), handleLogin);
router.post('/login', passport.authenticate('login', { session: false }), handleLogin);

export default router;
