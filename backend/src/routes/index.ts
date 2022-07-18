import authRouter from './auth';
import classroomsRouter from './classroom';
import healthcheckRouter from './healthcheck';
import passport from 'passport';
import { Router } from 'express';
import teachersRouter from './teacher';
import usersRouter from './user';

const router = Router();
const protectedRouter = Router();

router.use('/auth', authRouter);
router.use('/healthcheck', healthcheckRouter);

protectedRouter.use('/classrooms', classroomsRouter);
protectedRouter.use('/teachers', teachersRouter);
protectedRouter.use('/users', usersRouter);

router.use('/', passport.authenticate('jwt', { session: false }), protectedRouter);

export default router;
