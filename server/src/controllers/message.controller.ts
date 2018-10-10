import fse from "fs-extra";
import randomstring from "randomstring";
import * as _ from "lodash";

import { SERVER_URL, SERVER_PORT } from "../utils/secrets";
import models from "../models";
import { redisCache } from "./common";

const validateUploadFiles = data => {
  if (data.size > 1024 * 1024 * 5) {
    return { size: false };
  }
  if (
    !data.type.startsWith("image/") &&
    !data.type.startsWith("text/plain") &&
    !data.type.startsWith("audio/")
  ) {
    return { type: false };
  }
  return { size: true, type: true };
};

const generateFileName = data => {
  const fileExtension = data.name.replace(/^.*\./, "");
  const randomFileName = randomstring.generate().concat(`.${fileExtension}`);
  return randomFileName;
};

export default {
  getAllMessage: async (req, res) => {
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
  createMessage: async data => {
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
  getMessage: async (req, res) => {
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
