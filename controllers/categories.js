const Categories = require("../models").categories;
const Articles = require("../models").articles;
const Users = require("../models").users;

// get all category

exports.index = (req, res) => {
  Categories.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "is_published", "is_archived"]
    }
  }).then(data => {
    res.status(200);
    res.send(data);
  });
};

// get all article by category
const details = data => {
  const newArticles = data.map(item => {
    let newItems = {
      id: item.id,
      title: item.title,
      content: item.content,
      image: item.image,
      category: item.category.name,
      user: item.user.fullname
    };
    return newItems;
  });
  return newArticles;
};

exports.category = (req, res) => {
  const { name } = req.params;
  Articles.findAll({
    include: [
      {
        model: Categories,
        as: "category",
        where: {
          name: name
        }
      },
      {
        model: Users,
        as: "user"
      }
    ]
  }).then(data => res.send(details(data)));
};

exports.getDetail = (req, res) => {
  Categories.findOne({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.status(200).json({
      message: "get category",
      data: {
        id: data.id,
        name: data.name
      }
    });
  });
};

// add category
exports.addCategory = (req, res) => {
  Categories.create(req.body).then(data =>
    res.send({
      message: "success add category",
      data: {
        id: data.id,
        name: data.name
      }
    })
  );
};

// update category
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  Categories.update(req.body, {
    where: {
      id
    }
  }).then(data => {
    res.send({
      message: "update category success",
      data
    });
  });
};

// delete category
exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  Categories.destroy({
    where: {
      id
    }
  }).then(data => {
    res.send({
      message: "delete success",
      data
    });
  });
};
