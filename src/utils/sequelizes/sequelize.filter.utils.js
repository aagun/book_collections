const {Op} = require("sequelize");

function getOrderByFilter(value) {
  switch (value) {
    case 'sortByTitle':
      return ['book', 'title']
    default:
      return [];
  }
}

function getFieldByFilter(value) {
  switch (value) {
    case 'minPage':
    case 'maxPage':
      return 'totalPage';
    case 'minYear':
    case 'maxYear':
      return 'releaseYear';
    case 'title':
      return 'title';
  }
}

function getOperatorByFilter(value) {
  switch (value) {
    case 'maxPage':
    case 'maxYear':
      return Op.lte;
    case 'minPage':
    case 'minYear':
      return Op.gte;
    case 'title':
      return [Op.like, '%:parameter%'];
  }
}

function setFilterWhereClauseWithOperator({mainClause, mainWhereClause, modelName, queryParams}) {
  // Validate if query params exist
  if (!Object.keys(queryParams).length) {
    return mainClause;
  }

  // Decorate where clause by query params
  let whereClause = {};
  for (let [key, value] of Object.entries(queryParams)) {
    // Get mapped field table database related with key query param
    const field = getFieldByFilter(key);

    if (!field) {
      continue;
    }

    // Write clause if the field is existing
    const operatorFilter = getOperatorByFilter(key);
    let operator = null;
    let operatorValue = isNaN(value) ? value : Number(value);

    if (Array.isArray(operatorFilter)) {
      operator = operatorFilter[0];
      operatorValue = operatorFilter[1].replace(':parameter', value);
    } else {
      operator = operatorFilter;
      operatorValue = value;
    }

    whereClause[`$${modelName}.${field}$`] = {
      ...whereClause[`$${modelName}.${field}$`],
      [operator]: operatorValue
    }
  }

  // Merge where clauses
  whereClause = {
    ...mainWhereClause,
    ...whereClause
  }

  if (Object.keys(whereClause).length) {
    mainClause.where = whereClause;
  }

  return mainClause;
}

function setOrderClause(mainClause, obj) {

  const sortFilter = Object.entries(obj).filter(([k,v]) => k.toLowerCase().includes('sort'));

  if (!Object.keys(sortFilter).length) {
    return mainClause;
  }

  const sort = getOrderByFilter(sortFilter[0]);
  if (Object.keys(sort).length) {
    sort.push(sortFilter[1]);
    mainClause.order = [sort];
  }

  return mainClause;
}

module.exports = {
  setFilterWhereClauseWithOperator,
  setOrderClause
};