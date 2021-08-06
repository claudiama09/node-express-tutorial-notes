const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "john") {
    res.send("Authorized");
  } else {
    res.status(401).send("Unauthorized");
  }
  next();
};

module.exports = authorize;
