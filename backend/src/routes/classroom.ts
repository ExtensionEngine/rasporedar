import { Request, Response, Router } from 'express';
import Classroom from 'models/classroom';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const classrooms = await Classroom.findAll();

  res.json(classrooms);
});

export default router;
