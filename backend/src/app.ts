import cors, { CorsOptions } from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { passportInitializeStrategies } from 'middleware/passportStrategies';
import router from 'routes';
import status from 'http-status';
import { ValidationError } from 'sequelize';

const app: Application = express();
const port = 3001;

passportInitializeStrategies();

const whitelist = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(router);

app.use(
  (
    err: Error | { error: Error; status: number } | ValidationError,
    req: Request,
    res: Response,
    // Express does not pick up this method if next is not last parameter even if it is unused
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    if (err instanceof ValidationError) {
      return res.status(status.BAD_REQUEST).json({ error: err.errors[0].message });
    }
    if (err instanceof Error) {
      return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
    res.status(err.status).json({ error: err.error.message });
  },
);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
