import { NextFunction, Request, Response, Router } from 'express';
import { makeError } from 'helpers/error';
import { NOT_FOUND } from 'http-status';
import Teacher from 'models/teacher';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await Teacher.findAll()
    .then(teachers => res.json(teachers))
    .catch(error => next(error));
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await Teacher.findByPk(req.params.id)
    .then(teacher => {
      if (!teacher) {
        return next(makeError('Teacher with that id not found.', NOT_FOUND));
      }
      res.json(teacher);
    })
    .catch(error => next(error));
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  await Teacher.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    teacherCode: req.body.teacherCode,
  })
    .then(teacher => res.json(teacher))
    .catch(error => next(error));
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await Teacher.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      teacherCode: req.body.teacherCode,
    },
    { where: { id: req.params.id } },
  )
    .then(async results => {
      if (!results[0]) {
        return next(makeError('Teacher with that id not found.', NOT_FOUND));
      }
      res.json(await Teacher.findByPk(req.params.id));
    })
    .catch(error => next(error));
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await Teacher.destroy({ where: { id: req.params.id } })
    .then(result => {
      if (!result) {
        return next(makeError('Teacher with that id not found.', NOT_FOUND));
      }
      res.json({ message: 'Teacher deleted successfully.' });
    })
    .catch(error => next(error));
});

export default router;
