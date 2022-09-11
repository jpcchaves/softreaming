import express from "express";

import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const app = express();
  const port = process.env.PORT;
  app.use(express.json());

  app.get("/", (req, res) => {
    return res.json("Deu certo!");
  });

  return app.listen(port, () => {
    `API running on port ${port}`;
  });
});
