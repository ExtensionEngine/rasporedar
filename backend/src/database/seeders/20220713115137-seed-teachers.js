module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Teachers', [
      {
        firstName: 'John',
        lastName: 'Doe',
        teacherCode: 'JD1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Snoop',
        lastName: 'Dogg',
        teacherCode: 'SD420',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Teachers', [
      {
        teacherCode: 'JD1',
      },
      {
        teacherCode: 'SD420',
      },
    ]);
  },
};
