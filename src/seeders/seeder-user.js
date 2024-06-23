'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'khanhsDev@gamil.com',
        password: '123456',
        firstName: 'Khanhs',
        lastName: 'Dev',
        address: 'Nghe An',
        gender: '1',
        roleId: 'ROLE',
        phonenumber: '0392672182',
        positionId: 'BN01',
        image: '12312321321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
