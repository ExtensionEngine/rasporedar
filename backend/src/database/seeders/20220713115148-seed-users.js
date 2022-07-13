module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@rasporedar.com',
        password: 'admin',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', { email: 'admin@rasporedar.com' });
  },
};
