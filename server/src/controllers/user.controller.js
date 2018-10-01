import models from "../models";

const userSummary = user => {
  const summary = {
    id: user.id,
    username: user.username,
    email: user.email,
    brief_description: user.brief_description,
    avatarurl: user.avatarurl,
    detail_description: user.detail_description
  };
  return summary;
};

export default {
  get: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await models.User.findOne({
        where: { username },
        raw: true
      });

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

  /** ******************** */
  /* Not Implemented yet   */
  /** ******************** */
  update: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await models.User.findOne({
        where: { username },
        raw: true
      });
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
  /** ******************** */
  /* Not Implemented yet   */
  /** ******************** */
  delete: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await models.User.findOne({
        where: { username },
        raw: true
      });
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
