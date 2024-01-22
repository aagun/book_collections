const Joi = require('joi');
const ErrorMessages = require('../utils/constants/error-messages');
const CommonConstants = require('../utils/constants/common-constants');
const {
  hasLowercase,
  hasUppercase,
  hasNumber,
  hasSymbol
} = require('../utils/regex');

const RegisterUserPayloadValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(32).trim().required(),
  password: Joi.string()
                .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,32}$'))
                .required()
                .error(errors => {
                  errors.forEach(err => {
                    const value = err.local.value;
                    const label = err.local.label

                    if (err.code !== 'string.pattern.base') { return false; }

                    if (value.length < CommonConstants.PasswordMinLength) {
                      err.message = ErrorMessages.PasswordMinLength(label, CommonConstants.PasswordMinLength);
                    } else if (value.length > CommonConstants.PasswordMaxLength) {
                      err.message = ErrorMessages.PasswordMaxLength(label,  CommonConstants.PasswordMaxLength);
                    } else if (!hasLowercase(value)) {
                      err.message = ErrorMessages.PasswordNotContainLowercase(label);
                    } else if (!hasUppercase(value)) {
                      err.message = ErrorMessages.PasswordNotContainUppercase(label);
                    } else if (!hasNumber(value)) {
                      err.message = ErrorMessages.PasswordNotContainNumber(label);
                    } else if (!hasSymbol(value)) {
                      err.message = ErrorMessages.PasswordNotContainSymbol(label);
                    }
                  });

                  return errors;
                })
});

module.exports = {
  RegisterUserPayloadValidationSchema
};