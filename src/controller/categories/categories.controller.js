const express = require('express');
const {getCategories, postCategory, patchCategory} = require("../../service/categories/categories.service.js");

const controller = express.Router();

controller
  .get('/', getCategories)

  .post('/', postCategory)

  .patch('/:id', patchCategory);

module.exports = controller;