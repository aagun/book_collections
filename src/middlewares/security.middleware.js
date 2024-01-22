const {to} = require('await-to-js');
const ErrorMessages = require('../utils/constants/error-messages');
const {InternalServerErrorException, UnauthorizedException} = require("../exceptions/http.exception");
const {bcryptPasswordHash} = require('../security/bcrypt-password-hash');

async function encryptionPassword(req, res, next) {
    const [err, hashedPassword] = await to(bcryptPasswordHash(req.body.password));

    if (!hashedPassword) {
      console.error({err});
      throw new InternalServerErrorException(ErrorMessages.Generic);
    }

    req.hashedPassword = hashedPassword;
    next();
}

module.exports = {encryptionPassword};