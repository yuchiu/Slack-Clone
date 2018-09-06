import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import models from "../models";
import config from "../../config";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        const user = await models.User.findOne({
          where: { id: jwtPayload.id },
          raw: true
        });
        if (!user) {
          return done(new Error(), false);
        }
        return done(null, user);
      } catch (err) {
        return done(new Error(), false);
      }
    }
  )
);

module.exports = null;
