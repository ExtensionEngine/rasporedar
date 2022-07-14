import classroomsRouter from './classroom';
import healthchecksRouter from './healthcheck';
import { Router } from 'express';
import teachersRouter from './teacher';
import usersRouter from './user';

const router = Router();

router.use('/classrooms', classroomsRouter);
router.use('/healthchecks', healthchecksRouter);
router.use('/teachers', teachersRouter);
router.use('/users', usersRouter);

export default router;
