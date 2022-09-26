module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Teachers', [
      { firstName: 'Ante', lastName: 'Antic', teacherCode: '1', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Iva', lastName: 'Ivic', teacherCode: '2', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Maja', lastName: 'Majic', teacherCode: '3', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Marko', lastName: 'Markic', teacherCode: '4', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Mate', lastName: 'Matic', teacherCode: '5', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Nikola', lastName: 'Nikolic', teacherCode: '6', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Dino', lastName: 'Dinic', teacherCode: '7', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Luka', lastName: 'Lukic', teacherCode: '8', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Kreso', lastName: 'Kresic', teacherCode: '9', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Roko', lastName: 'Rokic', teacherCode: '10', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Mario', lastName: 'Maric', teacherCode: '11', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Ana', lastName: 'Anic', teacherCode: '12', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Tomislav', lastName: 'Tomic', teacherCode: '13', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Mislav', lastName: 'Mislavic', teacherCode: '14', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Ankica', lastName: 'Ankic', teacherCode: '15', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Nikolina', lastName: 'Nikolinic', teacherCode: '16', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Marica', lastName: 'Maric', teacherCode: '17', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Marta', lastName: 'Martic', teacherCode: '18', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Teachers', [
      { teacherCode: '1' },
      { teacherCode: '2' },
      { teacherCode: '3' },
      { teacherCode: '4' },
      { teacherCode: '5' },
      { teacherCode: '6' },
      { teacherCode: '7' },
      { teacherCode: '8' },
      { teacherCode: '9' },
      { teacherCode: '10' },
      { teacherCode: '11' },
      { teacherCode: '12' },
      { teacherCode: '13' },
      { teacherCode: '14' },
      { teacherCode: '15' },
      { teacherCode: '16' },
      { teacherCode: '17' },
      { teacherCode: '18' },
    ]);
  },
};
