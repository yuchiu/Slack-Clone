import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";

import models from "./models";
import config from "../config";
import routers from "./routers";

import "./utils/passport";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use(cors());

routers(app);

/* listen to port */
models.sequelize.sync().then(() => {
  app.listen(config.PORT || 3030, () => {
    if (config.PORT) {
      console.log(`app listenning on port ${config.PORT}`);
    } else {
      console.log("app listenning on port 3030");
    }
  });
});
