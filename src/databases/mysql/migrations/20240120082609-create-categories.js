module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
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
    await queryInterface.dropTable('Categories');
  }
};