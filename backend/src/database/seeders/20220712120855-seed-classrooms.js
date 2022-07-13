module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Classrooms', [
      {
        name: 'C1',
        capacity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'C2',
        capacity: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Classrooms', [{ name: 'C1' }, { name: 'C2' }]);
  },
};
