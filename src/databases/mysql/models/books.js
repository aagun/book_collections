'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate(models) {
      Books.belongsTo(models.Categories, {
        as: "category",
        foreignKey: "categoryId"
      })
    }
  }
  Books.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    price: DataTypes.STRING,
    totalPage: DataTypes.INTEGER,
    thickness: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};