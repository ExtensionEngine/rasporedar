import { NextFunction, Request, Response, Router } from 'express';
import { BAD_REQUEST } from 'http-status';
import { makeError } from 'helpers/error';
import User from 'models/user';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(error => next(error));
});

router.put('/', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user as User;

  User.update({ email: req.body.email }, { where: { id } })
    .then(() => res.json(User.findByPk(id)))
    .catch(error => next(error));
});

router.get('/profile', (req: Request, res: Response, next: NextFunction) => {
  User.findByPk((req.user as User).id)
    .then(user => res.json(user))
    .catch(error => next(error));
});

router.delete('/profile', (req: Request, res: Response, next: NextFunction) => {
  User.destroy({ where: { id: (req.user as User).id } })
    .then(() => res.json({ message: 'Deleted successfully' }))
    .catch(error => next(error));
});

router.put('/profile/password', (req: Request, res: Response, next: NextFunction) => {
  const { currentPassword, newPassword } = req.body;

  if (currentPassword === newPassword)
    return makeError('New password is same as old password. Please, enter different password.', BAD_REQUEST);

  User.update(
    { password: newPassword },
    {
      where: { id: (req.user as User).id },
      individualHooks: true,
    },
  )
    .then(() => res.json({ message: 'Password changed successfully' }))
    .catch(error => next(error));
});

export default router;
