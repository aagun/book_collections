'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    static associate(models) {
      categories.hasOne(models.books, {
        as: "book",
        foreignKey: "categoryId"
      })
    }
  }
  categories.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};