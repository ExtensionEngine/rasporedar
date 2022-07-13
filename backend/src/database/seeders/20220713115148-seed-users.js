module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@rasporedar.com',
        password: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', { email: 'admin@rasporedar.com' });
  },
};
