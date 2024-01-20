const Joi = require('joi');

const CategoryPayloadSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required()
});

module.exports = {CategoryPayloadSchema}
