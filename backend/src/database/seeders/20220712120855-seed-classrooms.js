module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Classrooms', [
      { name: '001', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '100', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '101', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '102', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '103', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '104', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '105', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '106', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '107', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '108', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '109', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '110', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '111', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '201', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '202', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '203', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '204', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '205', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
      { name: '206', capacity: 25, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Classrooms', [
      { name: '001' },
      { name: '100' },
      { name: '101' },
      { name: '102' },
      { name: '103' },
      { name: '104' },
      { name: '105' },
      { name: '106' },
      { name: '107' },
      { name: '108' },
      { name: '109' },
      { name: '110' },
      { name: '111' },
      { name: '201' },
      { name: '202' },
      { name: '203' },
      { name: '204' },
      { name: '205' },
      { name: '206' },
    ]);
  },
};
