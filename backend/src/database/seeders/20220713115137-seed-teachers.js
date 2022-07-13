module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Teachers', [
      {
        firstName: 'John',
        lastName: 'Doe',
        teacherCode: 'JD1',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        firstName: 'Snoop',
        lastName: 'Dogg',
        teacherCode: 'SD420',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
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
