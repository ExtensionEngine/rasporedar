import express, { Application } from 'express';
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

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
