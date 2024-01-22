const {to} = require('await-to-js');
const {BadRequestException, UnauthorizedException} = require("../exceptions/http.exception");
const HttpHeaders = require('../utils/constants/http-headers');
const ErrorMessages = require('../utils/constants/error-messages');
const {
  AuthLoginPayloadValidationSchema,
  AuthRefreshTokenPayloadValidationSchema
} = require('../validators/authentication.joi.validator');
const {verifyRefreshToken, verifyAccessToken} = require('../security/jwt-token-manager');

async function authLoginPayloadValidator(req, res, next){

  if (!req.body) {
    throw new BadRequestException('Missing request body');
  }

  const [error] = await to(AuthLoginPayloadValidationSchema.validateAsync(
    req.body,
    {errors: {wrap: {label: false}}}
  ));

  if (error) {
    throw new BadRequestException(error.message);
  }

  next();
}

async function authRefreshTokenPayloadValidator(req, res, next) {
  if (!req.body) {
    throw new BadRequestException('Missing request body')
  }

  const [error] = await to(AuthRefreshTokenPayloadValidationSchema.validateAsync(
    req.body,
    {errors: {wrap: {label: false}}}
  ));

  if (error) {
    throw new BadRequestException(error.message);
  }

  next();
}

async function authVerificationRefreshToken(req, _res, next) {
  const [_, decoded] = await to(verifyRefreshToken(req.body.refreshToken));

  if (!decoded) {
    throw new UnauthorizedException(ErrorMessages.Unauthorized);
  }

  req.decoded = decoded;
  next();
}

async function authVerificationAccessToken(req, _res, next) {
  if (!req.header(HttpHeaders.AUTHORIZATION)) {
    throw new UnauthorizedException(ErrorMessages.Unauthorized);
  }

  const accessToken = req.header(HttpHeaders.AUTHORIZATION).split(' ')[1];
  const [_, decoded] = await to(verifyAccessToken(accessToken));

  if (!decoded) {
    throw new UnauthorizedException(ErrorMessages.Unauthorized);
  }

  req.decoded = decoded;
  next();
}

module.exports = {
  authLoginPayloadValidator,
  authRefreshTokenPayloadValidator,
  authVerificationRefreshToken,
  authVerificationAccessToken
};