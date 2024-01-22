const db = require('../../databases/mysql/models');
const {to} = require('await-to-js');
const HttpStatusCode = require('../../utils/constants/http-status-codes');
const SuccessMessages = require('../../utils/constants/success-messages');
const ErrorMessages = require('../../utils/constants/error-messages');
const {bcryptComparePassword} = require('../../security/bcrypt-password-hash');
const {createRefreshToken, createAccessToken} = require('../../security/jwt-token-manager');
const {
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException
} = require("../../exceptions/http.exception");

async function postAuthentication(req, res) {

  let _, user, error;
  const {username, password} = req.body;

  // Validate if user exists
  [_, user] = await to(db.Users.findOne({
    where: {
      username,
    },
    attributes: ['id', 'username', 'password']
  }));

  if (!user) {
    throw new UnauthorizedException(ErrorMessages.Failed);
  }

  // Validate password is correct
  await bcryptComparePassword(password, user.password);

  const payload = {
    userId: user.id,
    username: user.username,
  }

  const accessToken = await createAccessToken(payload);
  const refreshToken = await createRefreshToken(payload);

  // Store refresh token in DB
  [error] = await to(db.Authentications.create({token: refreshToken}));

  if (error) {
    throw new InternalServerErrorException(ErrorMessages.Generic);
  }

  // send response to a client
  res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.CreateSuccess,
    data: [{
      accessToken,
      refreshToken
    }]
  });
}

async function patchAuthentication(req, res)  {

  const [_, auth] = await to(db.Authentications.findByPk(req.body.refreshToken));

  if (!auth) {
    throw new UnauthorizedException(ErrorMessages.Failed);
  }

  const {userId, username} = req.decoded;
  const accessToken = await createAccessToken({userId, username});

  res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.UpdateSuccess,
    data: [{
      accessToken
    }]
  });
}

async function deleteAuthentication(req, res) {
  const {refreshToken} = req.body;
  const [_, auth] = await to(db.Authentications.findByPk(refreshToken));

  if (!auth) {
    throw new UnauthorizedException(ErrorMessages.Failed);
  }

  const [error] = await to(db.Authentications.destroy({where: {token: refreshToken}}));

  if (error) {
    throw new InternalServerErrorException(ErrorMessages.Generic);
  }

  res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.DeleteSuccess,
    data: []
  });
}

module.exports = {
  postAuthentication,
  patchAuthentication,
  deleteAuthentication
};