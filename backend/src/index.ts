// express
import express from "express";
// data source
import { AppDataSource } from "./data-source";
// routes
import routes from "./routes";
// rate limit
import rateLimit from "express-rate-limit";

AppDataSource.initialize().then(() => {
  const app = express();
  const port = process.env.PORT;

  const limiter = rateLimit({
    max: 20,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  });
  app.use("/", limiter);

  app.use(express.json());

  app.use(routes);

  return app.listen(port, () => {
    `API running on port ${port}`;
  });
});
