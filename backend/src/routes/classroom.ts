import { NextFunction, Request, Response, Router } from 'express';
import Classroom from 'models/classroom';
import { makeError } from 'helpers/error';
import { NOT_FOUND } from 'http-status';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await Classroom.findAll()
    .then(classrooms => res.json(classrooms))
    .catch(next);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await Classroom.findByPk(req.params.id)
    .then(classroom => {
      if (!classroom) {
        return next(makeError('Classroom with that id not found.', NOT_FOUND));
      }
      res.json(classroom);
    })
    .catch(next);
});

router.post('/', async (req, res: Response, next: NextFunction) => {
  await Classroom.create({
    name: req.body.name,
    capacity: req.body.capacity,
  })
    .then(classroom => res.json(classroom))
    .catch(next);
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await Classroom.update(
    {
      name: req.body.name,
      capacity: req.body.capacity,
    },
    { where: { id: req.params.id } },
  )
    .then(async results => {
      if (!results[0]) {
        return next(makeError('Classroom with that id not found.', NOT_FOUND));
      }
      res.json(await Classroom.findByPk(req.params.id));
    })
    .catch(error => next(error));
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await Classroom.destroy({ where: { id: req.params.id } })
    .then(result => {
      if (!result) {
        return next(makeError('Classroom with id not found.', NOT_FOUND));
      }
      res.json({ message: 'Classroom deleted successfully.' });
    })
    .catch(error => next(error));
});

export default router;
