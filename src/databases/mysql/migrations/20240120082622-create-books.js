module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true
        }
      },
      releaseYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1980,
          max: 2021
        }
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalPage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      thickness: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.TIME,
        set (value) {
          this.setDataValue('createdAt', value)
        }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.TIME,
        set (value) {
          this.setDataValue('updatedAt', value)
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};