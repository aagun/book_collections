const {Router} = require('express');
const asyncHandler = require('express-async-handler');
const {getBooks, postBook, patchBook, deleteBook} = require('../../services/books/books.service');
const {bookPayloadValidator} = require('../../middlewares/book-validator.middleware');
const {
  authVerificationAccessToken
} = require('../../middlewares/authentication-validator.middleware');
const controller = Router();

controller

  .get('/', asyncHandler(getBooks))

  .post(
    '/',
    asyncHandler(authVerificationAccessToken),
    asyncHandler(bookPayloadValidator),
    asyncHandler(postBook)
  )

  .patch(
    '/:id',
    asyncHandler(authVerificationAccessToken),
    asyncHandler(bookPayloadValidator),
    asyncHandler(patchBook)
  )

  .delete(
    '/:id',
    asyncHandler(authVerificationAccessToken),
    asyncHandler(deleteBook)
  );

module.exports = controller