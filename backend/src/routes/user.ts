import { Request, Response, Router } from 'express';
import User from 'models/user';

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Returns all users.
 */
router.get('/', async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json(users);
});

export default router;
