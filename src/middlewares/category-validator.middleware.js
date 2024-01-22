const {to} = require('await-to-js');
const {CategoryPayloadValidationSchema} = require('../validators/category.joi.validator');
const {BadRequestException} = require('../exceptions/http.exception');

async function categoryPayloadValidator(req, res, next) {
  if (!req.body) {
    throw new BadRequestException('Missing request body');
  }

  const [error] = await to(CategoryPayloadValidationSchema.validateAsync(
    req.body,
    {errors: {wrap: {label: false}}}
  ));

  if (error) {
    throw new BadRequestException(error.message);
  }

  next();
}

module.exports = {categoryPayloadValidator};