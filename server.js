require("express-group-routes");

const express = require("express");

const app = express();

const port = 5000;
const categoriesController = require("./controllers/categories");
const articlesController = require("./controllers/articles");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hayyy");
});

app.group("/api/v1", router => {
  // API CATEGORIES

  // get all data categories
  router.get("/categories", categoriesController.index);
  // get detail category
  router.get("/category/:name", categoriesController.category);
  // Add Category
  router.post("/category", categoriesController.addCategory);
  // edit category
  router.patch("/editCategory/:id", categoriesController.updateCategory);
  // delete category
  router.delete("/deleteCategory/:id", categoriesController.deleteCategory);

  // API ARTICLES

  // get all articles
  router.get("/articles", articlesController.index);
  // get detail article
  router.get("/articleDetails/:title", articlesController.detail);
  // post article
  router.post("/addArticle", articlesController.addArticle);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
