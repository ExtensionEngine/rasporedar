import authRouter from './auth';
import classroomsRouter from './classroom';
import healthchecksRouter from './healthcheck';
import passport from 'passport';
import { Router } from 'express';
import teachersRouter from './teacher';
import usersRouter from './user';

const router = Router();

router.use('/classrooms', classroomsRouter);
router.use('/healthchecks', healthchecksRouter);
router.use('/teachers', teachersRouter);
router.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);
router.use('/auth', authRouter);

export default router;
