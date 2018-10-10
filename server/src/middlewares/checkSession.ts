import { Response, NextFunction } from "express";

import models from "../models";

export default () => async (req: any, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    const user = await models.User.findOne({
      where: {
        id: req.session.user.id
      },
      raw: true
    });
    if (user) {
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
