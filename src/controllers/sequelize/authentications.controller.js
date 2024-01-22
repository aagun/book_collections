const {Router} = require('express');
const asyncHandler = require('express-async-handler');

const {
  postAuthentication,
  patchAuthentication,
  deleteAuthentication
} = require('../../services/authentications/authentications.service');

const {
  authLoginPayloadValidator,
  authRefreshTokenPayloadValidator,
  authVerificationRefreshToken
} = require("../../middlewares/authentication-validator.middleware");

const controller = Router();

controller
  .post(
    '/',
    asyncHandler(authLoginPayloadValidator),
    asyncHandler(postAuthentication)
  )

  .patch(
    '/',
    asyncHandler(authRefreshTokenPayloadValidator),
    asyncHandler(authVerificationRefreshToken),
    asyncHandler(patchAuthentication)
  )

  .delete(
    '/',
    asyncHandler(authRefreshTokenPayloadValidator),
    asyncHandler(deleteAuthentication)
  );

module.exports = controller;