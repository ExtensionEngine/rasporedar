module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;');
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.CITEXT,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      form: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      raspored: {
        type: Sequelize.JSONB,
        allowNull: true,
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
    return queryInterface.dropTable('Users');
  },
};
