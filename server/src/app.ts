import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as socketIo from "socket.io";
import * as cors from "cors";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as helmet from "helmet";
import * as compression from "compression";
import * as bodyParser from "body-parser";

import { NODE_ENV, SERVER_PORT } from "./utils/secrets";
import { useSession, checkSession, simulateLatency } from "./middlewares";
import { apiV1Router, sockets } from "./routers";

/* connect express with socket.io, wrapping app with http server, then wrap http server with socket.io */
const app: express.Application = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

/* middlewares */
app.set("port", SERVER_PORT || 3030);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(useSession());
app.use(checkSession());
app.use(helmet());
app.use(compression());
app.use("/assets", express.static("assets"));
// use logger, simulateLatency for development
if (NODE_ENV === "development") {
  app.use(logger("dev"));
  //first arg is min time in millisecond, second arg is max time in millisecond add on top of min time
  app.use(simulateLatency(10, 100));
}
// use client production build */
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client")));
  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "./client") });
  });
}

/* routes & websockets events listener */
app.use("/api/v1", apiV1Router);
sockets(io);

export { app, httpServer };
