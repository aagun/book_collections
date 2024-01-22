const Joi = require('joi');

const BookPayloadValidationSchema = Joi.object({
  title: Joi.string().required().trim().max(255).optional(),
  description: Joi.string().trim().max(255).allow('', null).optional(),
  imageUrl: Joi.string().trim().uri().allow('', null).optional(),
  releaseYear: Joi.number().required().min(1980).max(2021).positive().optional(),
  price: Joi.string().required().optional(),
  totalPage: Joi.number().required().positive().min(0).optional(),
  categoryId: Joi.number().required().positive().optional()
});

module.exports = {
  BookPayloadValidationSchema
};