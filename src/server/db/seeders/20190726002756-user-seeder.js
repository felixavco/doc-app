'use strict';

let users = [];
let acct = 1;

for (let i = 1; i <= 1500; i++) {

  if (i % 3 === 0) {
    acct++
  }

  users.push({
    firstName: `User_acct_${acct}_${i}`,
    lastName: `User_lastName_${acct}_${i}`,
    middleName: `User_middleName_${acct}_${i}`,
    lastName: `User_Surname_${acct}_${i}`,
    email: `user_acct_${acct}_${i}@mail${acct}.com`,
    password: 'abc321',
    createdAt: new Date(),
    updatedAt: new Date(),
    clinicId: acct
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', users, {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
