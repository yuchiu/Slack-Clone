export default (req, res, next) => {
  if (!req.user) {
    res.status(403).send({
      meta: {
        type: "error",
        code: 403,
        message: "session authentication failed"
      }
    });
  } else {
    next();
  }
};
