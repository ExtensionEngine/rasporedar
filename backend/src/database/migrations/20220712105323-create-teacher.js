module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Teachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.CITEXT,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.CITEXT,
        allowNull: false,
      },
      teacherCode: {
        type: Sequelize.CITEXT,
        allowNull: false,
        unique: true,
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
    return queryInterface.dropTable('Teachers');
  },
};
