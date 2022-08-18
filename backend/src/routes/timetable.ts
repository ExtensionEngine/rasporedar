import { Request, Response, Router } from 'express';
import { generateTimetable } from 'algorithm';
import { generateTimetableProps } from 'algorithm/seed';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { timetable } = generateTimetable(generateTimetableProps);

  const mapper = (key: string) => [JSON.parse(key), timetable[key]];
  const mappedKeys = Object.keys(timetable).map(mapper);
  const timetableData = Object.fromEntries(mappedKeys);

  res.json({ timetable: timetableData });
});

export default router;
