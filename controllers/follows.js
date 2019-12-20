const Follows = require("../models").follows;

exports.add = (req, res) => {
  if (req.body.user_id === req.body.follows_user_id) {
    return res.status(403).json({
      message: "error forbidden! you cant follow your account"
    });
  }
  Follows.create(req.body).then(data => {
    res.status(200).json({
      id: data.id,
      user: {
        id: data.user_id
      }
    });
  });
};
