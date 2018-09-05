import bcrypt from "bcryptjs";

import { UserModel } from "../models";
import { jwtSignUser } from "../utils";

const userSummary = user => {
  const summary = {
    username: user.username,
    email: user.email,
    timestamp: user.timestamp
  };
  return summary;
};

const authController = {
  getUser: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await UserModel.findOne({ username });

      /* user not registered */
      if (!user) {
        return res.status(403).send({
          error: `this account ${username} is not yet registered`
        });
      }

      res.status(200).send({
        user: userSummary(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const credentials = req.body;

      const isUsernameRegistered = await UserModel.findOne({
        username: credentials.username
      });

      /* username already registered */
      if (isUsernameRegistered) {
        res.status(403).send({
          confirmation: false,
          error: `username: ${credentials.username} is already registered`
        });
      }

      const isEmailRegistered = await UserModel.findOne({
        email: credentials.email
      });

      /* email already registered */
      if (isEmailRegistered) {
        res.status(403).send({
          confirmation: false,
          error: `email: ${credentials.email} is already registered`
        });
      }

      /* credential is validated */
      credentials.password = await bcrypt.hash(credentials.password, 10);
      const user = await UserModel.create(credentials);
      res.status(200).send({
        user: userSummary(user),
        token: jwtSignUser(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const credentials = req.body;
      console.log(req.body);
      const user = await UserModel.findOne({ username: credentials.username });

      /* user not registered */
      if (!user) {
        return res.status(403).send({
          error: `this account ${credentials.username} is not yet registered`
        });
      }

      /* validate password */
      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.toJSON().password
      );

      /* invalid password */
      if (!isPasswordValid) {
        res.status(403).send({
          error: "invalid password"
        });
      }

      /* password is validated */
      res.status(200).send({
        user: userSummary(user),
        token: jwtSignUser(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  bearerTokenAuthUser: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const { username } = req.user;
      const user = await UserModel.findOne({
        username
      });

      res.status(200).send({
        confirmation: true,
        user: userSummary(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { username } = req.params;
      const isUserCreated = await UserModel.findOne({ username });

      /* user not registered */
      if (!isUserCreated) {
        return res.status(403).send({
          error: `this account ${username} is not yet registered`
        });
      }

      const user = await UserModel.findOneAndUpdate({ username }, req.body);
      res.status(200).send({
        user: userSummary(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { username } = req.params;
      const isUserCreated = await UserModel.findOne({ username });

      /* user not registered */
      if (!isUserCreated) {
        return res.status(403).send({
          error: `this account ${username} is not yet registered`
        });
      }

      const user = await UserModel.findOneAndRemove({ username });
      res.status(200).send({
        user: userSummary(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  }
};

export default authController;
