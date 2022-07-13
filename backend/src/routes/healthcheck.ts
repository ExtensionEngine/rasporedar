import { Request, Response, Router } from 'express';
import sequelize from '../database/connection';

const router = Router();

/**
 * @openapi
 * /healthchecks:
 *   get:
 *     description: Healthcheck
 *     responses:
 *       200:
 *         description: Returns health check success message.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();

    res.status(200).send('success');
  } catch (error) {
    res.status(500).send('failure');
  }
});

export default router;
