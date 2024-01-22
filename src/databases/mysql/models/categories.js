'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.hasOne(models.Books, {
        as: "book",
        foreignKey: "categoryId"
      })
    }
  }
  Categories.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};