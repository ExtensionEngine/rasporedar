import { Request, Response, Router } from 'express';
import User from 'models/user';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json(users);
});

export default router;
