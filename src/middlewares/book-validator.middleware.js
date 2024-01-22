const {to} = require('await-to-js');
const {BookPayloadValidationSchema} = require('../validators/book.joi.validator');
const {BadRequestException} = require('../exceptions/http.exception');

async function bookPayloadValidator(req, res, next) {
  if (!req.body) {
    throw new BadRequestException('Missing request body');
  }

  const [err] = await to(BookPayloadValidationSchema.validateAsync(
    req.body,
    {errors: {wrap: {label: false}}}
  ));

  if (err) {
    throw new BadRequestException(err.message);
  }

  next();
}

module.exports = {bookPayloadValidator};