import { Request, Response, Router } from 'express';
import { generateTimetable } from 'algorithm';
import { generateTimetableProps } from 'algorithm/seed';
import { removeEmptyFields } from 'helpers/timetable';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { timetable } = generateTimetable({
    classes: removeEmptyFields(req.body.classes),
    classrooms: generateTimetableProps.classrooms /* will be removed when classroom crud is merged */,
  });

  res.json({
    timetable,
  });
});

router.get('/seed', (req: Request, res: Response) => {
  const { classes } = generateTimetableProps;
  let id = 1;

  const seed = {
    classes: classes.map(classItem => ({
      ...classItem,
      _id: id++,
      subjects: classItem.subjects.map(subject => ({
        ...subject,
        _id: id++,
        classroom: subject.classroom || { name: '' },
      })),
    })),
  };

  res.json(seed);
});

export default router;
