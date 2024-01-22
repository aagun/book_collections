const {to} = require('await-to-js');
const {BadRequestException} = require("../exceptions/http.exception");
const {RegisterUserPayloadValidationSchema} = require('../validators/user.joi.validator');

async function RegisterUserPayloadValidator(req, res, next){

  if (!req.body) {
    throw new BadRequestException('Missing request body');
  }

  const [error] = await to(RegisterUserPayloadValidationSchema.validateAsync(
    req.body,
    {errors: {wrap: {label: false}}}
  ));

  if (error) {
    throw new BadRequestException(error.message);
  }

  next();
}

module.exports = {
  RegisterUserPayloadValidator
};