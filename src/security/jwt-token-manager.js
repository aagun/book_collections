const jwt = require('jsonwebtoken');
const {UnauthorizedException} = require("../exceptions/http.exception");
const ErrorMessages = require("../utils/constants/error-messages");

async function createAccessToken(payload) {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_KEY,
    {expiresIn: process.env.ACCESS_TOKEN_AGE}
  );
}

async function createRefreshToken(payload) {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_KEY,
    {expiresIn: process.env.REFRESH_TOKEN_AGE}
  );
}

async function verifyRefreshToken(token) {
  const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN_KEY);

  if (decoded) {
    return decoded;
  }

  throw new UnauthorizedException(ErrorMessages.Unauthorized);
}

async function verifyAccessToken(token) {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

  if (decoded) {
    return decoded;
  }

  throw new UnauthorizedException(ErrorMessages.Unauthorized);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  verifyAccessToken
};