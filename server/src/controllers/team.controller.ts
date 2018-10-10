import * as _ from "lodash";
import { Request, Response } from "express";

import { redisCache } from "./common";
import models from "../models";

export default {
  getAllTeam: async (req: Request, res: Response) => {
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
  createTeam: async (req: Request, res: Response) => {
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
  addTeamMember: async teamData => {
    try {
    } catch (err) {
      console.log(err);
      return {
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      };
    }
  },
  getTeamData: async (req: Request, res: Response) => {
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
