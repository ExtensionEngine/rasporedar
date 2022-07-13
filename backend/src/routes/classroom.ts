import { Request, Response, Router } from 'express';
import Classroom from 'models/classroom';

const router = Router();

/**
 * @openapi
 * /classrooms:
 *   get:
 *     description: Get all classrooms
 *     responses:
 *       200:
 *         description: Returns all classrooms.
 */
router.get('/', async (req: Request, res: Response) => {
  const classrooms = await Classroom.findAll();

  res.status(200).send(classrooms);
});

export default router;
