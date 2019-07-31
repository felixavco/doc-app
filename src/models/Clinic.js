'use strict';
module.exports = (sequelize, DataTypes) => {

  const Clinic = sequelize.define('Clinic', {
    name: DataTypes.STRING, 
    domain: DataTypes.STRING,
    speciality: DataTypes.STRING,
    account_type: DataTypes.STRING,
    logo: DataTypes.STRING,

    address_line: DataTypes.STRING,
    address_line2: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,

    primary_phone: DataTypes.STRING,
    secondary_phone: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    email: DataTypes.STRING,

    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    youtube: DataTypes.STRING,
    linkedin: DataTypes.STRING,

    is_active: DataTypes.BOOLEAN,
    is_verified: DataTypes.BOOLEAN,
    is_trial: DataTypes.BOOLEAN,
    verification_token: DataTypes.STRING, 
    exp_verification_token: DataTypes.DATE
  }, {
    underscored: true
  });

  Clinic.associate = function ({User, Patient}) {
    Clinic.hasMany(User, { onDelete: 'cascade' });
    Clinic.hasMany(Patient, { onDelete: 'cascade' });
  };
  return Clinic;
};