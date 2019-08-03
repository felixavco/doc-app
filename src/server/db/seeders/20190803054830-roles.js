'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      { role: "DOCTOR"},
      { role: "NOURSE"},
      { role: "SECRETARY"},
      { role: "ASSISTANT"},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};