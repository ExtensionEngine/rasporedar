import { Request, Response, Router } from 'express';
import { generateTimetable } from 'algorithm';
import { generateTimetableProps } from 'algorithm/seed';
import { removeEmptyFields } from 'helpers/timetable';
import { Subject } from 'algorithm/types';

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
  let id = 1;

  const subjectsMapper = (subject: Subject, id: number) => {
    const classroom = subject.classroom || { name: '' };
    return { ...subject, _id: id, classroom };
  };

  const classes = generateTimetableProps.classes.map(classItem => {
    const _id = id++;
    const subjects = classItem.subjects.map(subject => subjectsMapper(subject, id++));
    return { ...classItem, _id, subjects };
  });

  const seed = {
    classes,
  };

  res.json(seed);
});

export default router;
