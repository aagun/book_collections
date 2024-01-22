const Joi = require('joi');

const AuthLoginPayloadValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const AuthRefreshTokenPayloadValidationSchema = Joi.object({
  refreshToken: Joi.string().trim().required()
})

module.exports = {
  AuthLoginPayloadValidationSchema,
  AuthRefreshTokenPayloadValidationSchema
};