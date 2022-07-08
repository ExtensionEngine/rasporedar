import { Request, Response, Router } from 'express';

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
router.get('/classrooms', (req: Request, res: Response) => {
  res.send('classrooms');
});

export default router;
