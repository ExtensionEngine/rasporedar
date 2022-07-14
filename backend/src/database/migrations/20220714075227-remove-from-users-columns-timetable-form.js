module.exports = {
  up(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'form'),
      queryInterface.removeColumn('Users', 'timetable'),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'form', {
        type: Sequelize.JSONB,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'timetable', {
        type: Sequelize.JSONB,
        allowNull: true,
      }),
    ]);
  },
};
