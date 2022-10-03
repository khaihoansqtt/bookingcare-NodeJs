'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'khaihoancr7@gmail.com',
      password: 'hihikhaiday',
      firstName: 'Khải',
      lastName: 'Hoàn',
      address: 'Quảng Nam',
      phoneNumber: '0396826333',
      gender: 1,
      roleId: 'R1',
      positionId: '1',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
