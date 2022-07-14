import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Router } from 'express';

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
  res.json({
    user: req.user,
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
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
});

export default router;
