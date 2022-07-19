import { Request, Response, Router } from 'express';
import httpStatusCodes from 'consts/httpStatusCodes';
import sequelize from 'database/connection';

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

    res.send('success');
  } catch (error) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send('failure');
  }
});

export default router;
