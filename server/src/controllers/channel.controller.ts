import * as _ from "lodash";
import { Request, Response } from "express";

import { redisCache } from "./common";
import models from "../models";

export default {
  getAllChannel: async (req: Request, res: Response) => {
    try {
    } catch (err) {
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  createChannel: async (req: Request, res: Response) => {
    try {
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },

  getChannelData: async (req: Request, res: Response) => {
    try {
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  }
};
