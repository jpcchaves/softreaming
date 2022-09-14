import { Router } from "express";
import { MovieController } from "./controllers/MovieController";

const routes = Router();

routes.post("/movie", new MovieController().createMovie);
routes.get("/movies", new MovieController().getAllMovies);

export default routes;
