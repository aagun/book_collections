const db = require("../../database/mysql/models");
const CategoryValidator = require("../../validator/category");
const {ResponseHelper} = require("../../utils/ResponseHelper.js");
const to = require('await-to-js');


async function getCategories(req, res) {
  const [err, categories] = await to(db.categories.findAll());

  if (err) {
    console.error(err);
    return ResponseHelper.serverError();
  }

  return res.status(200).send({
    status: 1,
    message: "success",
    data: categories,
  });
}

async function postCategory(req, res) {

  const error = CategoryValidator.validateCategoryPayload(req.body);
  if (error) {
    return res.status(400).send({
      status: 0,
      message: error.details[0].message
    })
  }

  const {name} = req.body;
  const [err] = await to(db.categories.create({name}));

  if (err) {
    return res.status(500).send({
      status: 0,
      message: "Unable to save entry to database"
    });
  }

  res.status(201).send({
    status: 1,
    message: "Category created successfully",
    data: []
  });

}

async function patchCategory(req, res) {

  // Validate if id category exists
  const { id } = req.params;
  const [_, category] = await to(db.categories.findByPk(Number(id)));

  if (!category) {
    return res.status(404).send({
      status: 0,
      message: "Invalid"
    });
  }

  // Validate value of request body
  const error = CategoryValidator.validateCategoryPayload(req.body);

  if (error) {
    return res.status(400).send({
      status: 0,
      message: error.details[0].message
    });
  }

  // Execute update category
  const {name} = req.body;
  const [err] = db.categories.update({
    name,
    where: {
      id: Number(id)
    }
  });

  if (err) {
    return res.status(500).send({
      status: 0,
      message: "Unable to update entry to database"
    });
  }

  return res.status(200).send({
    status: 1,
    message: "success",
    data: []
  })
}

module.exports = {getCategories, postCategory, patchCategory};