const Categories = require("../models").categories;
const Articles = require("../models").articles;
const Users = require("../models").users;

// get all articles by user
exports.articles = (req, res) => {
  const { username } = req.params;
  Articles.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "category_id",
        "author_id",
        "is_published",
        "is_archived"
      ]
    },
    include: [
      {
        model: Categories,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_published", "is_archived"]
        },
        where: {
          is_published: true,
          is_archived: false
        }
      },
      {
        model: Users,
        as: "user",
        where: {
          username: username
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_active", "password"]
        }
      }
    ]
  }).then(data =>
    res.send({
      status: "200 OK",
      data: data
    })
  );
};
