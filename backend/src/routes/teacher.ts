import { NextFunction, Request, Response, Router } from 'express';
import { makeError } from 'helpers/error';
import { NOT_FOUND } from 'http-status';
import Teacher from 'models/teacher';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Teacher.findAll()
    .then(teachers => res.json(teachers))
    .catch(error => next(error));
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  Teacher.findByPk(req.params.id)
    .then(teacher => {
      if (teacher) return res.json(teacher);
      return next(makeError('Teacher with that id not found.', NOT_FOUND));
    })
    .catch(error => next(error));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  Teacher.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    teacherCode: req.body.teacherCode,
  })
    .then(teacher => res.json(teacher))
    .catch(error => next(error));
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  Teacher.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      teacherCode: req.body.teacherCode,
    },
    { where: { id: req.params.id } },
  )
    .then(async results => {
      if (results[0]) return res.json(await Teacher.findByPk(req.params.id));
      return next(makeError('Teacher with that id not found.', NOT_FOUND));
    })
    .catch(error => next(error));
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  Teacher.destroy({ where: { id: req.params.id } })
    .then(result => {
      if (result) return res.json({ message: 'Teacher deleted successfully.' });
      return next(makeError('Teacher with that id not found.', NOT_FOUND));
    })
    .catch(error => next(error));
});

export default router;
