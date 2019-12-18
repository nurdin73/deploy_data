const Categories = require("../models").categories;

// get all category
exports.index = (req, res) => {
  Categories.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }).then(data => res.send(data));
};

// get detail category
exports.category = (req, res) => {
  const { name } = req.params;
  Categories.findOne({
    where: {
      name: name
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }).then(data => res.send(data));
};

// add category
exports.addCategory = (req, res) => {
  Categories.create(req.body).then(data =>
    res.send({
      message: "success add category",
      data
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
