import authRouter from './auth';
import classroomsRouter from './classroom';
import healthcheckRouter from './healthcheck';
import passport from 'passport';
import { Router } from 'express';
import teachersRouter from './teacher';
import timetableRouter from './timetable';
import usersRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/healthcheck', healthcheckRouter);

router.use(passport.authenticate('jwt', { session: false }));

router.use('/classrooms', classroomsRouter);
router.use('/teachers', teachersRouter);
router.use('/users', usersRouter);

router.use('/timetable', timetableRouter);

export default router;
