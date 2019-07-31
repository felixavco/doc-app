'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('visits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      temperature: {
        type: Sequelize.DOUBLE
      },
      blood_presure: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.DOUBLE
      },
      weight: {
        type: Sequelize.DOUBLE
      },
      diagnose: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      patient_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('visits');
  }
};