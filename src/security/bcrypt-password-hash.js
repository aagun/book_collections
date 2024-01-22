const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const {UnauthorizedException} = require("../exceptions/http.exception");
const ErrorMessages = require("../utils/constants/error-messages");

dotenv.config();

async function bcryptPasswordHash(password) {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function bcryptComparePassword(password, hashedPassword)  {
  const result = await bcrypt.compare(password, hashedPassword);
  if (!result) {
    throw new UnauthorizedException(ErrorMessages.AuthenticationError)
  }
}

module.exports = {
  bcryptPasswordHash,
  bcryptComparePassword
}