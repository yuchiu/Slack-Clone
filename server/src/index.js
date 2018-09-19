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

import "./utils/passport";
import models from "./models";
import config from "./config";
import { routes, sockets } from "./routers";

/* connect express with socket.io, wrapping app with server, then wrap server with socket.io */
const app = express();
const server = http.Server(app);
const io = socketIo(server);

/* middlewares */
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(helmet())
  .use(compression())
  .use(bodyParser.json())
  .use("/files", express.static("./assets/files"));

/* allow cors, allow dev logs */
if (process.env.NODE_ENV === "development") {
  const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions)).use(logger("dev"));
}

/* use client production build */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client")));
  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "./client") });
  });
}

/* routes & websockets events listener */
routes(app);
sockets(io);

/* listen to port */
models.sequelize.sync().then(() => {
  server.listen(config.PORT || 3030, () => {
    if (config.PORT) {
      console.log(`app listenning on port ${config.PORT}`);
    } else {
      console.log("app listenning on port 3030");
    }
  });
});
