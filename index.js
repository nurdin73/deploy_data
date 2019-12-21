require("express-group-routes");
const jwt = require("express-jwt");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
const categoriesController = require("./controllers/categories");
const articlesController = require("./controllers/articles");
const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const followController = require("./controllers/follows");
const commentController = require("./controllers/comments");

// middleware
const { authorized, authenticated } = require("./middleware");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hayyy");
});

app.group("/api/v1", router => {
  // API CATEGORIES

  // get all data categories
  router.get("/categories", categoriesController.index);
  // get category id
  router.get("/category/:id", categoriesController.getDetail);
  // get detail category
  router.get("/category/:name/articles", categoriesController.category);
  // Add Category
  router.post("/category", categoriesController.addCategory);
  // edit category
  router.patch("/editCategory/:id", categoriesController.updateCategory);
  // delete category
  router.delete("/deleteCategory/:id", categoriesController.deleteCategory);

  // API ARTICLES
  // const authorized = (req, res, next) => {
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];
  //   if (token == null) return res.sendStatus(401);

  //   jwt.verify(token, "thisismysecretkey", (err, user) => {
  //     if (err) return res.sendStatus(403);
  //     req.user = user;
  //     next();
  //   });
  // };

  // get all articles
  router.get("/articles", articlesController.index);
  // get detail article
  router.get("/article/:title", articlesController.detail);
  // get Popular articles
  router.get("/article/latest", articlesController.popularArticle);
  // get related article
  router.get("/related/:result", articlesController.related);
  // post article
  router.post("/article", authenticated, articlesController.addArticle);
  // update post
  router.patch(
    "/user/:author_id/edit/:id",
    authorized,
    articlesController.updateArticle
  );
  // delete article
  router.delete(
    "/user/:author_id/delete/:article_id",
    authorized,
    articlesController.deleteArticle
  );

  // API LOGIN

  // login user
  router.post("/login", authController.login);
  // register user
  router.post("/register", authController.register);

  // API USER

  // get all article by person
  router.get("/user/:username/articles", userController.articles);

  // API FOLLOW

  // add follow
  router.post("/follow", authenticated, followController.add);

  router.get("/comments/:id", commentController.index);
});
// app.use((err, req, res, next) => {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).send("invalid token...");
//   }
// });

app.listen(port, () => console.log(`Listening on port ${port}!`));
