import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UserModel } from "../models";
import config from "../../config";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        const user = await UserModel.findOne({
          _id: jwtPayload._id
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
