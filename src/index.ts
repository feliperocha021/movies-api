import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import compression  from 'compression';
import passport from "./strategies/index.js"
import { ENV } from "./config/env.validation.js";
import { errorHandler } from "./middlewares/error.middleware.js";

import { UserService } from "./services/user.service.js"; 
import { RedisService } from "./services/redis.service.js"; 
import { AuthService } from "./services/auth.service.js"; 
import { AuthController } from "./controllers/auth.controller.js";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { UserController } from "./controllers/user.controller.js";
import { GenreService } from "./services/genre.service.js";
import { GenreController } from "./controllers/genre.controller.js";
import { genreRouter } from "./routes/genre.route.js";
import { movieRouter } from "./routes/movie.route.js";
import { MovieController } from "./controllers/movie.controller.js";
import { MovieService } from "./services/movie.service.js";
import { UploadService } from "./services/upload.service.js";
import { UploadController } from "./controllers/upload.controller.js";
import { uploadRouter } from "./routes/upload.route.js";
import path from "path";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userService = new UserService(); 
const redisService = new RedisService(); 
const authService = new AuthService(userService, redisService);
const genreService = new GenreService();
const movieService = new MovieService();
const uploadService = new UploadService();

const authController = new AuthController(authService);
const userController = new UserController(userService);
const genreController = new GenreController(genreService);
const movieController = new MovieController(movieService);
const uploadController = new UploadController(uploadService);

// rotas
app.use("/api/v1/auth", authRouter(authController));
app.use("/api/v1/users", userRouter(userController));
app.use("/api/v1/genres", genreRouter(genreController));
app.use("/api/v1/movies", movieRouter(movieController));
app.use("/api/v1/uploads", uploadRouter(uploadController, uploadService));

// erros
app.use(errorHandler);

mongoose.connect(ENV.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Movies API rodando");
});

app.listen(ENV.PORT, () => {
  console.log(`Servidor rodando na porta ${ENV.PORT}`);
});
