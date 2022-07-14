module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.transaction(function (t) {
      return Promise.all([
        queryInterface.removeColumn('Users', 'form', { transaction: t }),
        queryInterface.removeColumn('Users', 'timetable', { transaction: t }),
      ]);
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (t) {
      return Promise.all([
        queryInterface.addColumn(
          'Users',
          'form',
          {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'timetable',
          {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          { transaction: t },
        ),
      ]);
    });
  },
};
