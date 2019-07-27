'use strict';
module.exports = (sequelize, DataTypes) => {

  const Clinic = sequelize.define('Clinic', {
    name: DataTypes.STRING, 
    domain: DataTypes.STRING
  }, {});

  Clinic.associate = function ({User}) {
    Clinic.hasMany(User);
  };
  return Clinic;
};