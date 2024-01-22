const { NotFoundException } = require('../exceptions/http.exception');

const pageNotFoundExceptionHandler = (_req, _res, _next) => {
  throw new NotFoundException('Page not found!');
};

module.exports = pageNotFoundExceptionHandler;
