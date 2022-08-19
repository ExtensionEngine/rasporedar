import { Request, Response, Router } from 'express';
import { generateTimetable } from 'algorithm';
import { generateTimetableProps } from 'algorithm/seed';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { timetable } = generateTimetable({
    ...req.body,
    classrooms: generateTimetableProps.classrooms /* will be removed when classroom crud is merged */,
  });

  res.json({
    timetable,
  });
});

export default router;
