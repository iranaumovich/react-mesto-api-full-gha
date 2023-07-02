require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { urlRegex } = require("./utils");
const NotFoundError = require("./errors/NotFoundError");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const rateLimit = require("express-rate-limit");

// настроили порт из переменной окружения, который слушаем.
const { PORT = 3000, DB_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2 }),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(urlRegex),
      email: Joi.string().required().email({ minDomainSegments: 2 }),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.use(auth);

app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

app.use(errorLogger);

app.use("*", (req, res, next) => {
  next(new NotFoundError("Маршрут не найден"));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
