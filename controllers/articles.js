const Articles = require("../models").articles;
const Categories = require("../models").categories;
const Users = require("../models").users;
const Comments = require("../models").comments;

// get all article
const articles = data => {
  const newArticle = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      content: item.content,
      image: item.image,
      category: item.category.name,
      user: item.user.fullname
    };
    return newItem;
  });
  return newArticle;
};

exports.index = (req, res) => {
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
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "is_published",
            "is_archived",
            "is_active",
            "password"
          ]
        },
        where: {
          is_active: true
        }
      }
    ]
  })
    .then(data => res.send(articles(data)))
    .catch(err => {
      res.status(500);
      res.send(err);
    });
};

// popular articles

exports.popularArticle = (req, res) => {
  Articles.findAll({
    order: [["id", "DESC"]],
    limit: 10,
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
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "is_published",
            "is_archived",
            "is_active",
            "password"
          ]
        },
        where: {
          is_active: true
        }
      }
      // {
      //   model: Users,
      //   as: "User"
      // }
    ]
  })
    .then(data => res.send(articles(data)))
    .catch(err => {
      res.status(500);
      res.send(err);
    });
};

// article detail
// const detailArticles = data => {
//   const newArticle = data.map(item => {
//     let newItem = {
//       id: item.id,
//       title: item.title,
//       content: item.content,
//       image: item.image,
//       category: item.category.name,
//       user: item.user.fullname,
//       comment: item.comment.comment,
//       user_comment: item.comment.user.
//     };
//     return newItem;
//   });
//   return newArticle;
// };
exports.detail = (req, res) => {
  const { title } = req.params;
  Articles.findOne({
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
    where: {
      title: title
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
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "is_published",
            "is_archived",
            "is_active",
            "password"
          ]
        },
        where: {
          is_active: true
        }
      },
      {
        model: Comments,
        as: "comment",
        attributes: {
          exclude: ["createdAt", "updatedAt", "user_id", "article_id"]
        },
        include: [
          {
            model: Users,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "is_active", "password"]
            }
          }
        ]
      }
      // {
      //   model: Users,
      //   as: "User"
      // }
    ]
  }).then(data => res.send(data));
  // .catch(err => {
  //   res.status(500);
  //   res.send(err);
  // });
};

exports.related = (req, res) => {
  const { result } = req.params;
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
        where: {
          is_published: true,
          is_archived: false
        }
      },
      {
        model: Users,
        as: "user",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "is_published",
            "is_archived",
            "is_active",
            "password"
          ]
        },
        where: {
          is_active: true
        }
      }
    ],
    limit: parseInt(result)
  }).then(data => res.send(articles(data)));
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

// update article
exports.updateArticle = (req, res) => {
  const { id } = req.params;
  Articles.update(req.body, {
    where: {
      id: id
    }
  })
    .then(data =>
      res.send({
        message: "update success",
        Update: data
      })
    )
    .catch(err => res.send(err));
};
