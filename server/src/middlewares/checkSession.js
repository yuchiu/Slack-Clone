import models from "../models";

export default () => async (req, res, next) => {
  if (req.session && req.session.user) {
    const user = await models.User.findOne({
      where: {
        username: req.session.user.username
      }
    });
    if (user.dataValues) {
      req.user = user;
      delete req.user.password; // delete the password from the session
      req.session.user = user; // refresh the session value
      res.locals.user = user;
    }
    // finishing processing the middleware and run the route
    next();
  } else {
    next();
  }
};
