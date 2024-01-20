'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    static associate(models) {
      books.belongsTo(models.categories, {
        as: "category",
        foreignKey: "categoryId"
      })
    }
  }
  books.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    price: DataTypes.STRING,
    totalPage: DataTypes.INTEGER,
    thickness: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};