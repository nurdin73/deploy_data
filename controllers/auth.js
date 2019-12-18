const jwt = require("jsonwebtoken");
const Users = require("../models").users;

// login
exports.login = (req, res) => {
  const { email, password } = req.body;
  Users.findOne({
    where: {
      email: email,
      password: password
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
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
          fullname: user.fullname
        },
        "thisismysecretkey"
      );
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

// register
exports.register = (req, res) => {
  const token = jwt.sign({ email: req.body.email }, "thisismysecretkey");
  Users.create(req.body).then(data =>
    res.send({
      message: "register success",
      User: data,
      token: token
    })
  );
};
