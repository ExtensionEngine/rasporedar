import { Request, Response, Router } from 'express';
import sequelize from 'database/connection';
import status from 'http-status';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();

    res.send('success');
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send('failure');
  }
});

router.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

export default router;
