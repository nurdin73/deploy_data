"use strict";
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define(
    "articles",
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      author_id: DataTypes.INTEGER,
      is_published: DataTypes.BOOLEAN,
      is_archived: DataTypes.BOOLEAN
    },
    {}
  );
  articles.associate = function(models) {
    articles.belongsTo(models.categories, {
      foreignKey: "category_id",
      sourceKey: "id"
    });
    articles.belongsTo(models.users, {
      foreignKey: "author_id",
      sourceKey: "id"
    });
  };
  return articles;
};
