'use strict';
let clinics = [];
const specialities = ['Odontologia', 'Pediatria', 'Cardiologia', 'Medicina General'];
let i = 1
while(i <= 100) {
  clinics.push({
    name: `clinic_name_${i}`,
    domain: `clinicdomain${i}.com`,
    speciality: specialities[Math.floor(Math.random() * (3 - 0 + 1) + 0)],
    account_type: 'Clinic',
    verification_token: `token_${Math.floor(Math.random() * (100 - 1 + 1) + 1)}`,
    exp_verification_token: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  });

  i++;
}

const myclinic = {
  name: 'Clinica de Node.js y Java',
  domain: 'clinicalosjavas.com',
  speciality: 'Javascript',
  account_type: 'Clinic',
  verification_token: 'Token1234567890',
  exp_verification_token: new Date(),
  created_at: new Date(),
  updated_at: new Date()
}


module.exports = {
  up: (queryInterface, Sequelize) => {
 
    return queryInterface.bulkInsert('clinics', [ myclinic, ...clinics ], {});
  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('clinics', null, {});
    
  }
};
