import { BAD_REQUEST, NO_CONTENT, NOT_FOUND } from 'http-status';
import { NextFunction, Request, Response, Router } from 'express';
import { makeError } from 'helpers/error';
import User from 'models/user';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user as User;
    const { email } = req.body;

    await User.update({ email }, { where: { id } });
    const user = await User.findByPk(id);

    return res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/profile', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user as User;
    const user = await User.findByPk(id);

    if (user === null) return makeError('Not Found', NOT_FOUND);

    return res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/profile', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user as User;
    const user = await User.findByPk(id);

    if (user === null) return makeError('Not Found', NOT_FOUND);

    await user.destroy();

    return res.status(NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.put('/profile/password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user as User;
    const { currentPassword, newPassword } = req.body;
    const user = await User.update({ password: newPassword }, { where: { id } });

    if (currentPassword === newPassword || user === null) return makeError('Bad Request', BAD_REQUEST);

    return res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
