module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@rasporedar.com',
        password: '$2b$10$XHpexLgEJju/16z1CTdryeVZnkkcaOfzDmS0a2jNcTZvENT.eBuSS', // password: admin
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', { email: 'admin@rasporedar.com' });
  },
};
