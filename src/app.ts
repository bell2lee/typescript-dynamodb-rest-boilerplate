import express, { Express, Request, Response, NextFunction } from 'express';
import userRouter from './routers/user-router';
import apiRouter from './routers/api-token';
import ErrorHandler from './lib/middlewares/error-handler';
import { User, UserExcludedPassword } from './types/user-type';

interface Context{
  user?: UserExcludedPassword | null,
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace,no-shadow
  namespace Express {
    // eslint-disable-next-line no-shadow
    interface Request {
      context: Context
    }
  }
}

const port: string = process.env.PORT || '8000';
const app: Express = express();

app.use(express.json());

// TODO: CORS 검증
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Router Layer
app.use('/users', userRouter);
app.use('/api-token', apiRouter);
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is  listening on http://127.0.0.1:${port}/`);
});
