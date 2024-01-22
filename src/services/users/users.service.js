const db = require('../../databases/mysql/models');
const {to} = require('await-to-js');
const HttpStatusCode = require('../../utils/constants/http-status-codes');
const ErrorMessages = require('../../utils/constants/error-messages');
const SuccessMessages = require('../../utils/constants/success-messages');
const {ConflictException, InternalServerErrorException} = require("../../exceptions/http.exception");

async function postUserRegister(req, res) {
  const {username} = req.body;

  const [_, user] = await to(db.Users.findOne({where: {username}}));

  if (user) {
    throw new ConflictException(ErrorMessages.UsernameAlreadyTaken);
  }

  const [err] = await to(db.Users.create({username, password: req.hashedPassword}));

  if (err) {
    console.error(err)
    throw new InternalServerErrorException(ErrorMessages.Generic);
  }

  res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.CreateSuccess,
    data: []
  });
}

module.exports = {
  postUserRegister
}