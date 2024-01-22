const mysqlCategoryRouter = require('../controllers/sequelize/categories.controller');
const mysqlBookRouter = require('../controllers/sequelize/books.controller');
const mysqlAuthenticationRouter = require('../controllers/sequelize/authentications.controller');
const mysqlUserRouter = require('../controllers/sequelize/users.controller');
const exceptionHandler = require('../middlewares/exception-handling.middleware');
const pageNotFoundExceptionHandler = require('../middlewares/page-not-found-exception-handler.middleware');

function routerSetup(app) {
  app
    .use('/categories', mysqlCategoryRouter)
    .use('/books', mysqlBookRouter)
    .use('/authentications', mysqlAuthenticationRouter)
    .use('/users', mysqlUserRouter)
    .use('*', pageNotFoundExceptionHandler)
    .use(exceptionHandler);
}

module.exports = routerSetup;
