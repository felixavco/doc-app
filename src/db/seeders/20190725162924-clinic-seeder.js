'use strict';

let clinics = []

for(let i = 1; i <= 500; i++) {
    clinics.push({
        name: `Clinic_${i}`,
        domain: `clinic-${i}.com`,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('clinics', clinics, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('clinics', null, {});
  }
};
