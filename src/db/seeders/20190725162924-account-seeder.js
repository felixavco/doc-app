'use strict';

let accounts = []

for(let i = 1; i <= 10; i++) {
    accounts.push({
        name: `Account_${i}`,
        domain: `account-${i}.com`,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('accounts', accounts, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('accounts', null, {});
  }
};
