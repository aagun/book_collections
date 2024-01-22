const {Router} = require('express');
const asyncHandler = require('express-async-handler');

const {postUserRegister} = require('../../services/users/users.service');
const {encryptionPassword} = require('../../middlewares/security.middleware');
const {RegisterUserPayloadValidator} = require("../../middlewares/user-validator.middleware");

const controller = Router();

controller
  .post(
    '/',
    asyncHandler(RegisterUserPayloadValidator),
    asyncHandler(encryptionPassword),
    asyncHandler(postUserRegister)
  );

module.exports = controller;