module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Classrooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.CITEXT,
        allowNull: false,
        unique: true,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Sequelize.NOW,
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Classrooms');
  },
};
