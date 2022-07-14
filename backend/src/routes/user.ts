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

router.get('/profile', (req, res) => {
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token,
  });
});

export default router;
