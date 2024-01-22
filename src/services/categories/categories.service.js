const db = require('../../databases/mysql/models');
const {to} = require('await-to-js');
const {NotFoundException, InternalServerErrorException} = require("../../exceptions/http.exception");
const ErrorMessages = require('../../utils/constants/error-messages');
const SuccessMessages = require('../../utils/constants/success-messages');
const HttpStatusCode = require('../../utils/constants/http-status-codes');
const {setFilterWhereClauseWithOperator, setOrderClause} = require('../../utils/sequelizes/sequelize.filter.utils');

async function getCategories(req, res) {
  const [err, categories] = await to(db.Categories.findAll());

  if (err) {
    throw new InternalServerErrorException(ErrorMessages.NotFound);
  }

  return res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.GetSuccess,
    data: categories,
  });
}

async function postCategory(req, res) {
  const {name} = req.body;
  const [err] = await to(db.Categories.create({name}));

  if (err) {
    throw new InternalServerErrorException(ErrorMessages.CreateFail);
  }

  res.status(HttpStatusCode.Created).send({
    status: 1,
    message: SuccessMessages.CreateSuccess,
    data: []
  });

}

async function patchCategory(req, res) {

  // Validate if id category exists
  const { id } = req.params;
  const [_, category] = await to(db.Categories.findByPk(Number(id)));

  if (!category) {
    throw new NotFoundException(ErrorMessages.NotFound);
  }

  // Execute update category
  const {name} = req.body;
  const [err] = db.categories.update(
    {name},
    {
      where: {
        id: Number(id)
      }
    });

  if (err) {
    throw new InternalServerErrorException(ErrorMessages.UpdateFail);
  }

  return res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.UpdateSuccess,
    data: []
  });
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  const _id = Number(id);
  const [_, category] = await to(db.Categories.findByPk(Number(_id)));

  if (!category) {
    throw new NotFoundException(ErrorMessages.NotFound);
  }

  const [err] = await to(db.Categories.destroy({
    where: {id: _id,}
  }));

  if (err) {
    throw new InternalServerErrorException(ErrorMessages.DeleteFail);
  }

  return res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.DeleteSuccess,
    data: []
  });

}

async function getCategoryWithBook(req, res) {

  const id = Number(req.params.id);
  const [_, category] = await to(db.Categories.findByPk(id));

  if (!category) {
    throw new NotFoundException(ErrorMessages.NotFound);
  }

  // Decorate sequelize options
  let mainClause = {
    include: [
      {
        model: db.Books,
        as: 'book',
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      }
    ],
  }

  mainClause = setOrderClause(mainClause, req.query);
  mainClause = setFilterWhereClauseWithOperator({
    mainClause,
    mainWhereClause: { id },
    modelName: 'book',
    queryParams: req.query
  });

  const [err, categoryWithBook] = await to(db.Categories.findAll(mainClause));

  if (err) {
    throw new InternalServerErrorException(ErrorMessages.Generic);
  }

  return res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.GetSuccess,
    data: categoryWithBook
  });

}


module.exports = {
  getCategories,
  postCategory,
  patchCategory,
  deleteCategory,
  getCategoryWithBook
};
