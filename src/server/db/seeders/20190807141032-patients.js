'use strict';
let patients = [];
let i = 1
let count = 1;
let clinic_id = 2;

while(i <= 500) {

  if(count%5 === 0) {
    clinic_id++
  }

  patients.push({
    first_name: `Patient_first_name_${i}`,
    last_name: `Patient_last_name_${i}`,
    email: `patient${i}@mail.com`,
    dob: new Date(),
    clinic_id: clinic_id,
    created_at: new Date(),
    updated_at: new Date()
  });

  i++;
  count++;
}

let MyPatients = [];
let j = 1

while(j <= 100) {

  MyPatients.push({
    first_name: `My_Patient_first_name_${j}`,
    last_name: `My_Patient_last_name_${j}`,
    email: `My_patient${j}@mail.com`,
    dob: new Date(),
    clinic_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  });

  j++;
}



module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkInsert('patients', [...MyPatients, ...patients], {});
    // return queryInterface.bulkInsert('patients', MyPatients, {});

  },

  down: (queryInterface, Sequelize) => {
 
    return queryInterface.bulkDelete('patients', null, {});
    
  }
};
