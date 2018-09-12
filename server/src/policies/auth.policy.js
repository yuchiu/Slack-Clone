import Joi from "joi";
import passport from "passport";

export default {
  authentication: (req, res, next) => {
    passport.authenticate("jwt", (err, user) => {
      if (err || !user) {
        res.status(403).send({
          error: "token authentication failed"
        });
      } else {
        req.user = user;
        next();
      }
    })(req, res, next);
  },
  registerRule: (req, res, next) => {
    const schema = {
      username: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$")),
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$"))
    };
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(403).send({
            error: "email address is not valid"
          });
          break;
        case "username":
          res.status(403).send({
            error: `username is not valid
                    <br/>
                    1. It must be at least 4 characters and not greater than 32 characters.`
          });
          break;
        case "password":
          res.status(403).send({
            error: `the password provided failed to match the following rules:
                    <br/>
                    1. It must contain ONLY the following characters: lower case, upper case, numerics
                    <br/>
                    2. It must be at least 4 characters and not greater than 32 characters.
                    `
          });
          break;
        default:
          res.status(403).send({
            error: "invalid registration infomation"
          });
      }
    } else {
      next(); // call next if no errors in validation
    }
  }
};
