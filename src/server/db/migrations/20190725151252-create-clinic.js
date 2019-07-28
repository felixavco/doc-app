'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clinics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      domain: {
        type: Sequelize.STRING
      },
      speciality: {
        type: Sequelize.STRING
      },
      account_type: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      //Addresss
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
      country: {
        type: Sequelize.STRING
      },
      //Contact Information
      primary_phone: {
        type: Sequelize.STRING
      },
      secondary_phone: {
        type: Sequelize.STRING
      },
      whatsapp: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      //Social Media
      facebook: {
        type: Sequelize.STRING
      },
      instagram: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
      },
      youtube: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },

      //Account metadata
      is_active: {
        defaultValue: true, 
        type: Sequelize.BOOLEAN
      },
      is_verified: {
        defaultValue: false, 
        type: Sequelize.BOOLEAN
      },
      is_trial: {
        defaultValue: false, 
        type: Sequelize.BOOLEAN
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
      },
      verification_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      exp_verification_token: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clinics');
  }
};