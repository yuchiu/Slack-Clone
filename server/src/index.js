import express from "express";
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
import { routes, sockets } from "./routers";

import "./utils/passport";

const app = express();
/* connect express with socket.io, first wrap app with server, then wrap server with socket.io */
const server = http.Server(app);
const io = socketIo(server);

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(helmet())
  .use(compression())
  .use(bodyParser.json())
  .use(cors());
if (process.env.NODE_ENV !== "production") app.use(logger("dev"));

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
