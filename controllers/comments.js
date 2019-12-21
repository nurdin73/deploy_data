const Articles = require("../models").articles;
const Users = require("../models").users;
const Comments = require("../models").comments;

const comments = data => {
  const newData = data.map(item => {
    let newComment = {
      id: item.id,
      comment: item.comment,
      title_article: item.article.title,
      user: item.user.fullname
    };
    return newComment;
  });
  return newData;
};

exports.index = (req, res) => {
  const { id } = req.params;
  Comments.findAll({
    where: {
      article_id: id
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "article_id", "user_id"]
    },
    include: [
      {
        model: Articles,
        as: "article"
      },
      {
        model: Users,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_active", "password"]
        }
      }
    ]
  }).then(data => {
    res.status(200).json(comments(data));
  });
};

// {
//     model: Comments,
//     as: "comment",
//     attributes: {
//       exclude: ["createdAt", "updatedAt", "user_id", "article_id"]
//     },
//     include: {
//       model: Users,
//       as: "user",
//       attributes: {
//         exclude: ["createdAt", "updatedAt", "is_active", "password"]
//       }
//     }
//   }
