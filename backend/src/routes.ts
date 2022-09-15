import { Router } from "express";
import { MovieController } from "./controllers/MovieController";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";

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

// user routes
routes.post("/user", new UserController().createUser);
routes.post("/login", new UserController().authenticateUser);
routes.get("/profile", authMiddleware, new UserController().getProfile);

export default routes;
