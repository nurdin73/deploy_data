const jwt = require("jsonwebtoken");
const Users = require("../models").users;

// login
exports.login = (req, res) => {
  const { username, password } = req.body;
  Users.findOne({
    where: {
      username: username,
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
  })
    .then(user => {
      if (user) {
        const token = jwt.sign(
          {
            id: user.id
          },
          "thisismysecretkey"
        );
        res.status(200).json({
          username: user.username,
          token: token
        });
      } else {
        res.send({
          message: "invalid login!"
        });
      }
    })
    .catch(err => {
      res.send(err);
    });
};

// register
exports.register = (req, res) => {
  const token = jwt.sign({ email: req.body.email }, "thisismysecretkey");
  Users.create(req.body).then(data =>
    res.status(200).json({
      username: data.username,
      token: token
    })
  );
};
