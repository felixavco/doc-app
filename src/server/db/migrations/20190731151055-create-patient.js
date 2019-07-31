'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      middlename: {
        type: Sequelize.STRING
      },
      last_name2: {
        type: Sequelize.STRING
      },

      email: {
        type: Sequelize.STRING
      },
      primary_phone: {
        type: Sequelize.STRING
      },
      secondary_phone: {
        type: Sequelize.STRING
      },
      
      dob: {
        type: Sequelize.DATE
      },
      blood_type: {
        type: Sequelize.STRING
      },
      insurance_number: {
        type: Sequelize.STRING
      },
      alergies: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      insurance_provider: {
        type: Sequelize.STRING
      },
      address_line: {
        type: Sequelize.STRING
      },
      address_line2: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      clinic_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('patients');
  }
};