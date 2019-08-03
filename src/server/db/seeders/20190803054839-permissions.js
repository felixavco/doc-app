'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissions', [
      { code: 1, description: "USER"},
      { code: 2, description: "ADMIN"},
      { code: 3, description: "SUPER ADMIN"},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
