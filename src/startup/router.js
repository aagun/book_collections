const mysqlCategoryRouter = require("../controller/categories/categories.controller");

function routerSetup(app) {
  app
    .use("/categories", mysqlCategoryRouter)
    .use("*", (req, res) => {
      res.status(404).send({
        status: 0,
        message: "Not Found"
      })
    })
}

module.exports = routerSetup;