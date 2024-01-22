const ErrorMessages = require('../utils/constants/error-messages');

function exceptionHandler (error, req, res, _next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || ErrorMessages.Generic;
  return res.status(statusCode).send({
    status: 0,
    message,
    data: []
  })
}

module.exports = exceptionHandler;