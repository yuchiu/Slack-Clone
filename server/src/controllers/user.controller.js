import jwt from "jsonwebtoken";

import models from "../models";
import config from "../../config";

const jwtSignUser = user => {
  try {
    const userJson = user.toJSON();
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(userJson, config.JWT_SECRET, {
      expiresIn: ONE_WEEK
    });
  } catch (err) {
    console.log(err);
  }
};

const authController = {
  getUser: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await models.User.findOne({ where: { username } });

      /* user not registered */
      if (!user) {
        return res.status(403).send({
          error: `this account ${username} is not yet registered`
        });
      }

      res.status(200).send({
        user: user.userSummary(user)
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

      /* username or email is missing */
      if (!credentials.username || !credentials.email) {
        res.status(500).send({
          error: "username and email are required"
        });
      }

      const isUsernameRegistered = await models.User.findOne({
        where: { username: credentials.username }
      });

      /* username already registered */
      if (isUsernameRegistered) {
        res.status(403).send({
          error: `username: ${credentials.username} is already registered`
        });
      }

      const isEmailRegistered = await models.User.findOne({
        where: {
          email: credentials.email
        }
      });

      /* email already registered */
      if (isEmailRegistered) {
        res.status(403).send({
          error: `email: ${credentials.email} is already registered`
        });
      }

      /* credential is validated */
      const user = await models.User.create(credentials);
      res.status(200).send({
        user: user.userSummary(user),
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
      const user = await models.User.findOne({
        where: { username: credentials.username }
      });

      /* user not registered */
      if (!user) {
        return res.status(403).send({
          error: `this account ${credentials.username} is not yet registered`
        });
      }

      /* validate password */
      const isPasswordValid = await user.comparePassword(credentials.password);

      /* validated */
      if (isPasswordValid) {
        res.status(200).send({
          user: user.userSummary(user),
          token: jwtSignUser(user)
        });
      }

      /* invalid password */
      res.status(403).send({
        error: "invalid password"
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
      const user = await models.User.findOne({
        where: { username }
      });

      res.status(200).send({
        user: user.userSummary(user)
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
      /** ******************** */
      /* Not Implemented yet */
      /** ******************** */
      const { username } = req.params;
      const user = await models.User.findOne({ where: { username } });
      res.status(200).send({
        user: user.userSummary(user)
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
      /** ******************** */
      /* Not Implemented yet */
      /** ******************** */
      const { username } = req.params;
      const user = await models.User.findOne({ where: { username } });
      res.status(200).send({
        user: user.userSummary(user)
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
