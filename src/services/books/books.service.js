const db = require('../../databases/mysql/models');
const {to} = require('await-to-js');
const {InternalServerErrorException, NotFoundException} = require("../../exceptions/http.exception");
const ErrorMessages = require('../../utils/constants/error-messages');
const SuccessMessages = require('../../utils/constants/success-messages');
const HttpStatusCode = require('../../utils/constants/http-status-codes');
const {thicknessOfBook} = require('./books.service.util');
const {setFilterWhereClauseWithOperator, setOrderClause} = require('../../utils/sequelizes/sequelize.filter.utils');

async function getBooks(req, res) {
  let mainClause = {};
  mainClause = setOrderClause(mainClause, req.query);
  mainClause = setFilterWhereClauseWithOperator({
    mainClause,
    mainWhereClause: {},
    modelName: 'Books',
    queryParams: req.query
  });

  const [err, books] = await to(db.Books.findAll(mainClause));

  if (err) {
    console.error(err);
    throw new InternalServerErrorException(ErrorMessages.Generic);
  }

  return res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.GetSuccess,
    data: books
  });
}

async function postBook(req, res){
  const {
    title,
    description,
    imageUrl,
    releaseYear,
    price,
    totalPage,
    categoryId
  } = req.body;

  [err, category] = await to(db.Categories.findByPk(Number(categoryId)));

  if (!category) {
    throw new NotFoundException(`Category ${ErrorMessages.NotFound}`);
  }

  const thickness = thicknessOfBook(totalPage);

  const [err] = await to (db.Books.create({
    title,
    description,
    imageUrl,
    releaseYear,
    price,
    totalPage,
    categoryId,
    thickness
  }));

  if (err) {
    throw new InternalServerErrorException(ErrorMessages.Generic);
  }

  return res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.CreateSuccess,
    data: []
  });
}

async function patchBook(req, res){

  let err, book, category;
  const id = Number(req.params.id);
  [err, book] = await to(db.Books.findByPk(id));

  if (!book) {
    throw new NotFoundException(`Book ${ErrorMessages.NotFound}`);
  }

  const payload = {
    totalPage: req.body.totalPage,
    categoryId: req.body.categoryId
  }

  if (payload.categoryId) {
    [err, category] = await to(db.Categories.findByPk(Number(payload.categoryId)));

    if (!category) {
      throw new NotFoundException(`Category ${ErrorMessages.NotFound}`);
    }
  }

  if (payload.totalPage) {
    payload.thickness = thicknessOfBook(payload.totalPage);
  }

  [err] = await to (db.Books.update(payload, { where: {id}}));

  if (err) {
    throw new InternalServerErrorException(ErrorMessages.Generic);
  }

  return res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.CreateSuccess,
    data: []
  });
}

async function deleteBook(req, res) {
  let err, book, category;
  const id = Number(req.params.id);
  [err, book] = await to(db.Books.findByPk(id));

  if (!book) {
    throw new NotFoundException(`Book ${ErrorMessages.NotFound}`);
  }

  [err] = await to(db.Books.destroy({where: {id}}));

  if (err) {
    throw new InternalServerErrorException(ErrorMessages.DeleteFail);
  }

  return res.status(HttpStatusCode.Ok).send({
    status: 1,
    message: SuccessMessages.DeleteSuccess,
    data: []
  });
}

module.exports = {getBooks, postBook, patchBook, deleteBook};