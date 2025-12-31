import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import compression  from 'compression';
import passport from "./strategies"
import { ENV } from "./config/env.validation";
import { errorHandler } from "./middlewares/error.middleware";

import { UserService } from "./services/user.service"; 
import { RedisService } from "./services/redis.service"; 
import { AuthService } from "./services/auth.service"; 
import { AuthController } from "./controllers/auth.controller"; 
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import { UserController } from "./controllers/user.controller";
import { GenreService } from "./services/genre.service";
import { GenreController } from "./controllers/genre.controller";
import { genreRouter } from "./routes/genre.routes";

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

const userService = new UserService(); 
const redisService = new RedisService(); 
const authService = new AuthService(userService, redisService);
const genreService = new GenreService();
const authController = new AuthController(authService);
const userController = new UserController(userService);
const genreController = new GenreController(genreService)

// rotas
app.use("/api/v1/auth", authRouter(authController));
app.use("/api/v1/users", userRouter(userController));
app.use("/api/v1/genres", genreRouter(genreController));

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
