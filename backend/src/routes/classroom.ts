import { NextFunction, Request, Response, Router } from 'express';
import Classroom from 'models/classroom';
import { makeError } from 'helpers/error';
import { NOT_FOUND } from 'http-status';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Classroom.findAll()
    .then(classrooms => res.json(classrooms))
    .catch(error => next(error));
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  Classroom.findByPk(req.params.id)
    .then(classroom => {
      if (classroom) return res.json(classroom);
      return next(makeError('Classroom with that id not found.', NOT_FOUND));
    })
    .catch(error => next(error));
});

router.post('/', (req, res: Response, next: NextFunction) => {
  Classroom.create({
    name: req.body.name,
    capacity: req.body.capacity,
  })
    .then(classroom => res.json(classroom))
    .catch(error => next(error));
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  Classroom.update(
    {
      name: req.body.name,
      capacity: req.body.capacity,
    },
    { where: { id: req.params.id } },
  )
    .then(async results => {
      if (results[0]) return res.json(await Classroom.findByPk(req.params.id));
      return next(makeError('Classroom with that id not found.', NOT_FOUND));
    })
    .catch(error => next(error));
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  Classroom.destroy({ where: { id: req.params.id } })
    .then(result => {
      if (result) return res.json({ message: 'Classroom deleted successfully.' });
      return next(makeError('Classroom with id not found.', NOT_FOUND));
    })
    .catch(error => next(error));
});

export default router;
