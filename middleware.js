const jwt = require("express-jwt");

exports.authenticated = jwt({ secret: "thisismysecretkey" });

exports.authorized = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers.authorization;
  if (token) {
    jwt.verify(token, "thisismysecretkey", (err, decode) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decode = decode;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};
