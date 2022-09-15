import { Router } from "express";
import { MovieController } from "./controllers/MovieController";

// validation
import { movieValidate } from "./middlewares/movieValidations";

const routes = Router();

// movie routes
routes.post("/movie", movieValidate, new MovieController().createMovie);
routes.get("/movies", new MovieController().getAllMovies);
routes.delete("/movies/:movieId", new MovieController().deleteMovie);
routes.put(
  "/movies/:movieId",
  movieValidate,
  new MovieController().updateMovie
);

export default routes;
