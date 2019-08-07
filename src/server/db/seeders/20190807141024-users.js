'use strict';
let users = [];
const role = ['ASSISTANT', 'DOCTOR', 'NOURSE', 'SECRETARY'];
let i = 1
let count = 1;
let clinic_id = 2;

while(i <= 500) {

  if(count%5 === 0) {
    clinic_id++
  }

  users.push({
    first_name: `first_name_${i}`,
    last_name: `last_name_${i}`,
    role: role[Math.floor(Math.random() * (3 - 0 + 1) + 0)],
    permission: Math.floor(Math.random() * (3 - 1 + 1) + 1),
    email: `user${i}@mail.com`,
    password: `passcode_${i}`,
    user_name: `user_${i}`,
    clinic_id: clinic_id,
    created_at: new Date(),
    updated_at: new Date()
  });

  i++;
  count++;
}

const myUsers = []

let j = 1;

while(j <= 100) {

  myUsers.push({
    first_name: `My_User_first_name_${j}`,
    last_name: `My_User_last_name_${j}`,
    role: role[Math.floor(Math.random() * (3 - 0 + 1) + 0)],
    permission: Math.floor(Math.random() * (3 - 1 + 1) + 1),
    email: `My_User_user${j}@mail.com`,
    password: `passcode_${j}`,
    user_name: `My_User_user_${j}`,
    clinic_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  });

  j++;
}



module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [...myUsers, ...users], {});
    
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('users', null, {});

  }
};
