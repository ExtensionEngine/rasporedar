import express, { Application, Request, Response } from 'express';
import { sequelize } from 'models';

const app: Application = express();

const port = 3001;

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello ExtensionEngine!');
});

app.get('/healthcheck', async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();

    res.send('success');
  } catch (error) {
    res.status(500);
    res.send('failure');
  }
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
