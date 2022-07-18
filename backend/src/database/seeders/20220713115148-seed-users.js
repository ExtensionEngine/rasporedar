// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@rasporedar.com',
        password: await bcrypt.hash('admin', parseInt(process.env.SALT_ROUNDS)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', { email: 'admin@rasporedar.com' });
  },
};
