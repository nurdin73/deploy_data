const jwt = require("express-jwt");

exports.authenticated = jwt({ secret: "thisismysecretkey" });

exports.authorized = (req, res) => {
  if (req.user.id != req.params.user_id) {
    return res.status(401).json({ message: "you are not authenticated" });
  }
  next();
};
