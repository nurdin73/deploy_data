const Articles = require("../models").articles;
const Categories = require("../models").categories;
const Users = require("../models").users;

exports.index = (req, res) => {
  Categories.findAll({
    include: [
      {
        model: Users,
        as: "users",
        through: {
          model: Articles
        }
      }
    ]
  }).then(data => res.send(data));
};

exports.detail = (req, res) => {
  const { title } = req.params;
  Categories.findOne({
    include: [
      {
        model: Users,
        as: "users",
        through: {
          model: Articles,
          where: {
            title: title
          }
        }
      }
    ]
  }).then(data => res.send(data));
};

// Post articles
exports.addArticle = (req, res) => {
  Articles.create(req.body).then(data =>
    res.send({
      message: "success add article",
      data
    })
  );
};
