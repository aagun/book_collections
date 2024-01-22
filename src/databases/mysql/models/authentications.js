'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authentications extends Model {
    static associate(models) {
    }
  }
  Authentications.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Authentications',
  });
  return Authentications;
};