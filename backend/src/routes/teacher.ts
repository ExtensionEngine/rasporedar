import { Request, Response, Router } from 'express';
import Teacher from 'models/teacher';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const teachers = await Teacher.findAll();

  res.json(teachers);
});

export default router;
