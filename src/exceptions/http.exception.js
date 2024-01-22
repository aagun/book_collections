const createError = require('http-errors');
const HTTPStatusCode = require('../utils/constants/http-status-codes');
const HTTPMessages = require('../utils/constants/http-messages');

class BadRequestException {
  constructor(message = HTTPMessages.BAD_REQUEST) {
    throw createError(HTTPStatusCode.BadRequest, message);
  }
}

class ConflictException {
  constructor(message = HTTPMessages.CONFLICT) {
    throw createError(HTTPStatusCode.Conflict, message);
  }
}

class UnauthorizedException {
  constructor(message = HTTPMessages.UNAUTHORIZED) {
    throw createError(HTTPStatusCode.Unauthorized, message);
  }
}

class NotFoundException {
  constructor(message = HTTPMessages.NOT_FOUND) {
    throw createError(HTTPStatusCode.NotFound, message);
  }
}

class InternalServerErrorException {
  constructor(message = HTTPMessages.INTERNAL_SERVER_ERROR) {
    throw createError(HTTPStatusCode.InternalServerError, message);
  }
}

module.exports = {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ConflictException
}