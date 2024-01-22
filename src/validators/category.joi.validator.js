const Joi = require('joi');

const CategoryPayloadValidationSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required()
});

module.exports = {
  CategoryPayloadValidationSchema
};
