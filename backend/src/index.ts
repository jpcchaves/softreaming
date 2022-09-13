// express
import express from "express";
// data source
import { AppDataSource } from "./data-source";
// routes
import routes from "./routes";

AppDataSource.initialize().then(() => {
  const app = express();
  const port = process.env.PORT;

  app.use(express.json());

  app.use(routes);

  return app.listen(port, () => {
    `API running on port ${port}`;
  });
});
