module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Classrooms', [
      {
        name: 'C1',
        capacity: 20,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: 'C2',
        capacity: 25,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Classrooms', [{ name: 'C1' }, { name: 'C2' }]);
  },
};
