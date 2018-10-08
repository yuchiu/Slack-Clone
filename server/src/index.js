import express from "express";
import path from "path";
import http from "http";
import socketIo from "socket.io";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";

import models from "./models";
import config from "./config";
import { sessionConfig, checkSession } from "./middlewares";
import { routes, sockets } from "./routers";

/* connect express with socket.io, wrapping app with server, then wrap server with socket.io */
const app = express();
const server = http.Server(app);
const io = socketIo(server);

/* middlewares */
// allow cors & dev logs
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

// use client production build */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client")));
  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "./client") });
  });
}
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(sessionConfig());
app.use(checkSession());
app.use(helmet());
app.use(compression());
app.use("/assets", express.static("assets"));

/* routes & websockets events listener */
routes(app);
sockets(io);

/* listen to port */
models.sequelize.sync().then(() => {
  server.listen(config.SERVER_PORT, () => {
    console.log(`app listenning on port ${config.SERVER_PORT}`);
  });
});
