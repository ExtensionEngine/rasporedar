import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NO_CONTENT } from 'http-status';
import { Request, Response, Router } from 'express';
import Classroom from 'models/classroom';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const classrooms = await Classroom.findAll();

  res.json(classrooms);
});

router.post('/', async (req: Request, res: Response) => {
  const { name, capacity } = req.body as Classroom;

  if (name === null || capacity < 1) return res.status(BAD_REQUEST).json({ message: 'Bad Request' });

  const classroom = await Classroom.create({
    name,
    capacity,
  });

  if (classroom === null) return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });

  return res.json(classroom);
});

router.put('/:id', async (req: Request, res: Response) => {
  const { name, capacity } = req.body as Classroom;
  const { id } = req.params;

  if (name === null || capacity < 1) return res.status(BAD_REQUEST).json({ message: 'Bad Request' });

  const classroom = await Classroom.update(
    {
      name,
      capacity,
    },
    {
      where: { id },
    },
  );

  if (classroom === null) return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });

  return res.json(classroom);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  // const classroom = await Classroom.findByPk(id);

  // if (classroom === null)
  //   return res.status(httpStatus.NOT_FOUND).json({ message: "Not Found"});

  // await classroom.destroy();

  // return res.json(id);
  return Classroom.destroy({ where: { id } }).then(() => res.sendStatus(NO_CONTENT));
});

export default router;
