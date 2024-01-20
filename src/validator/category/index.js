const {CategoryPayloadSchema} = require("./schema");

const CategoryValidator = {
  validateCategoryPayload: (payload) => {
    const {error} = CategoryPayloadSchema.validate(payload);
    return error;
  }
}

module.exports = CategoryValidator