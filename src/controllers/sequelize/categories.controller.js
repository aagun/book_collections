const {Router} = require('express');
const asyncHandler = require('express-async-handler');

const {
  getCategories,
  postCategory,
  patchCategory,
  deleteCategory,
  getCategoryWithBook
} = require('../../services/categories/categories.service');

const {
  categoryPayloadValidator
} = require('../../middlewares/category-validator.middleware');

const {
  authVerificationAccessToken
} = require('../../middlewares/authentication-validator.middleware');

const controller = Router();

controller
  .get('/', asyncHandler(getCategories))

  .post(
    '/',
    asyncHandler(authVerificationAccessToken),
    asyncHandler(categoryPayloadValidator),
    asyncHandler(postCategory)
  )

  .patch(
    '/:id',
    asyncHandler(authVerificationAccessToken),
    asyncHandler(categoryPayloadValidator),
    asyncHandler(patchCategory)
  )

  .delete(
    '/:id',
    asyncHandler(authVerificationAccessToken),
    asyncHandler(deleteCategory)
  )

.get(
  '/:id/books',
  asyncHandler(getCategoryWithBook)
);

module.exports = controller;
