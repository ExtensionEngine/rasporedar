import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';
import Teacher from 'models/teacher';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const teachers = await Teacher.findAll();

  return res.json(teachers);
});

router.post('/', async (req: Request, res: Response) => {
  const { firstName, lastName, teacherCode } = req.body as Teacher;

  if (firstName === null || lastName === null || teacherCode === null)
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Bad Request' });

  const teacher = await Teacher.create({
    firstName,
    lastName,
    teacherCode,
  });

  if (teacher === null) return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });

  return res.json(teacher);
});

router.put('/:id', async (req: Request, res: Response) => {
  const { firstName, lastName, teacherCode } = req.body as Teacher;
  const { id } = req.params;

  if (firstName === null || lastName === null || teacherCode === null)
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Bad Request' });

  const teacher = await Teacher.update(
    {
      firstName,
      lastName,
      teacherCode,
    },
    {
      where: { id },
    },
  );

  if (teacher === null) return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });

  return res.json(teacher);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const teacher = await Teacher.findByPk(id);

  if (teacher === null) return res.status(httpStatus.NOT_FOUND).json({ message: 'Not Found' });

  teacher.destroy();

  return res.json(id);
});

export default router;
