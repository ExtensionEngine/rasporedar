import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatusCodes from 'consts/httpStatusCodes';
import { passportInitializeStrategies } from 'middleware/passportStrategies';
import router from 'routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app: Application = express();
const port = 3001;

passportInitializeStrategies();

app.use(express.json());

app.use(router);

app.use(
  '/swagger',
  swaggerUI.serve,
  swaggerUI.setup(
    swaggerJSDoc({
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'rasporedar',
          version: '1.0.0',
        },
      },
      apis: ['./src/controllers/*.ts'],
    }),
  ),
);

// Express does not pick up this method if next is not last parameter even if it is unused
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error | { error: Error; status: number }, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    return;
  }
  res.status(err.status).json({ error: err.error.message });
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
