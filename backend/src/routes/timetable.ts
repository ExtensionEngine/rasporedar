import { Request, Response, Router } from 'express';
import { generateTimetable } from 'algorithm';
import { generateTimetableProps } from 'algorithm/seed';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { timetable } = generateTimetable(generateTimetableProps);

  res.json({
    timetable,
  });
});

export default router;
