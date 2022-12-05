// express async errors
import 'express-async-errors';
// express
import express from 'express';
// data source
import { AppDataSource } from './data-source';
// routes
import movieRoute from './routes/Movie';
import userRoute from './routes/User';
import profileRoute from './routes/Profile';
// rate limit
import rateLimit from 'express-rate-limit';
// cors
import cors from 'cors';
import { errorMiddleware } from './middlewares/error';

AppDataSource.initialize().then(() => {
  const app = express();
  const port = process.env.PORT;

  app.locals.urlProfileS3;

  app.use(express.json());

  app.use('/user', userRoute);
  app.use('/movies', movieRoute);
  app.use('/profiles', profileRoute);

  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  });

  app.use('/', limiter);

  app.use(cors({credentials: true}));

  app.use(errorMiddleware);

  return app.listen(port, () => {
    console.log(`API running on port ${port}`);
  });
});
