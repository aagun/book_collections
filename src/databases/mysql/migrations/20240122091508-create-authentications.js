'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authentications', {
      token: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.TIME,
        set: (value) => {
          this.setDataValue('createdAt', value);
        }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.TIME,
        set: (value) => {
          this.setDataValue('updatedAt', value);
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Authentications');
  }
};