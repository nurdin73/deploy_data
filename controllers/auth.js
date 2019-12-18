const jwt = require("jsonwebtoken");
const Users = require("../models").users;
exports.login = (req, res) => {
  const { email, password } = req.body;
  Users.findOne({
    where: {
      email,
      password
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "is_published",
        "is_archived",
        "is_active",
        "password"
      ]
    }
  }).then(user => {
    if (user) {
      const token = jwt.sign({ id: user.id }, "thisismysecretkey");
      res.send({
        user,
        token
      });
    } else {
      res.send({
        message: "invalid login!"
      });
    }
  });
};
