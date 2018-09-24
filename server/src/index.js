import express from "express";
import path from "path";
import http from "http";
import socketIo from "socket.io";
import redis from "redis";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";

import "./utils/passport";
import models from "./models";
import config from "./config";
import { routes, sockets } from "./routers";

/* connect express with socket.io, wrapping app with server, then wrap server with socket.io */
const app = express();
const server = http.Server(app);
const io = socketIo(server);

/* allow cors & dev logs */
if (process.env.NODE_ENV === "development") {
  app.use(cors());
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
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
