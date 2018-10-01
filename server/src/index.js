import express from "express";
import path from "path";
import http from "http";
import socketIo from "socket.io";
import redis from "redis";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";

import "./utils/passport";
import models from "./models";
import config from "./config";
import { routes, sockets } from "./routers";

const RedisStore = require("connect-redis")(session);

/* connect express with socket.io, wrapping app with server, then wrap server with socket.io */
const app = express();
const server = http.Server(app);
const io = socketIo(server);

/* allow cors & dev logs */
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

/* use client production build */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client")));
  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "./client") });
  });
}

/* middlewares */
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    store: new RedisStore({
      port: process.env.REDIS_PORT || "6379",
      host: process.env.REDIS_HOST || "localhost"
    }),
    secret: process.env.SESSION_SECRET || "secret",
    name: "session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

// check for session and expose the user’s profile fields as variables
app.use(async (req, res, next) => {
  console.log("---------------");
  console.log("sessions checker");
  console.log("req.session");
  console.log(req.session);
  if (req.session && req.session.user) {
    const user = await models.User.findOne({
      username: req.session.user.username
    });
    console.log("---------------");
    console.log("set req.user");
    console.log("user.dataValues");
    console.log(user.dataValues);
    if (user.dataValues) {
      req.user = user;
      delete req.user.password; // delete the password from the session
      req.session.user = user; // refresh the session value
      res.locals.user = user;
    }
    // finishing processing the middleware and run the route
    next();
  } else {
    next();
  }
});

app.use(helmet());
app.use(compression());
app.use("/assets", express.static("assets"));

/* routes & websockets events listener */
routes(app);
sockets(io);

/* listen to port */
models.sequelize.sync().then(() => {
  server.listen(config.PORT, () => {
    console.log(`app listenning on port ${config.PORT}`);
  });
});
