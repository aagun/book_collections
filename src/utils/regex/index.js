function hasLowercase(value) {
  return /[a-z]/.test(value);
}

function hasUppercase(value) {
  return /[A-Z]/.test(value);
}
function hasNumber(value) {
  return /\d/.test(value);
}
function hasSymbol(value) {
  return /[^\da-zA-Z]/.test(value);
}

module.exports = {
  hasLowercase,
  hasUppercase,
  hasNumber,
  hasSymbol
}