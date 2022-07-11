import { Request, Response, Router } from 'express';
import { sequelize } from 'models';

const router = Router();

/**
 * @openapi
 * /healthcheck:
 *   get:
 *     description: Healthcheck
 *     responses:
 *       200:
 *         description: Returns health check success message.
 */
router.get('/healthcheck', async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();

    res.send('success');
  } catch (error) {
    res.status(500);
    res.send('failure');
  }
});

export default router;
