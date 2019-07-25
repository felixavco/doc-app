'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('accounts', [
        {
          name: 'Account1',
          domain: "Account1.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Account2',
          domain: "Account2.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Account3',
          domain: "Account3.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Account4',
          domain: "Account4.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Account5',
          domain: "Account5.com",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
