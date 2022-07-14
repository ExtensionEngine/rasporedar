module.exports = {
  up(queryInterface) {
    return queryInterface.renameColumn('Users', 'raspored', 'timetable');
  },

  down(queryInterface) {
    return queryInterface.renameColumn('Users', 'timetable', 'raspored');
  },
};
