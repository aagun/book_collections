const ErrorMessages = {
  Failed: 'Failed',
  AppStartupFail: 'Unable to start the app!',
  AuthenticationError: 'Username or password is incorrect',
  CreateFail: 'Unable to save entry to database!',
  GetFail: 'Unable to retrieve data from database!',
  UpdateFail: 'Unable to update data in database!',
  DeleteFail: 'Unable to delete entry from database!',
  DuplicateEntryFail: 'User already exists!',
  Generic: 'Something went wrong!',
  NotFound: 'Unable to find the requested resource!',
  Unauthorized: 'Unauthorized!',
  UncaughtException: 'Uncaught Exception thrown!',
  UnhandledRejection: 'Unhandled Exception thrown!',
  UsernameAlreadyTaken: 'Username already taken',
  PasswordMismatchFail: 'Passwords must match!',
  PasswordMinLength: (label, min) => `${label} length must be at least ${min} characters long`,
  PasswordMaxLength: (label, max) => `${label} length must be at least ${max} characters long`,
  PasswordNotContainSymbol: (label) => `${label} must contain at least one symbol`,
  PasswordNotContainNumber: (label) => `${label} must contain at least one symbol`,
  PasswordNotContainUppercase: (label) => `${label} must contain at least one uppercase letter`,
  PasswordNotContainLowercase: (label) => `${label} must contain at least one lowercase letter`
}

module.exports = ErrorMessages;