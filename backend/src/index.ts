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

  app.use(cors({
    origin: '*'
  }));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });

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

  app.use(errorMiddleware);

  return app.listen(port, () => {
    console.log(`API running on port ${port}`);
  });
});
