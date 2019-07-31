'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    middlename: DataTypes.STRING,
    last_name2: DataTypes.STRING,

    email: DataTypes.STRING,
    primary_phone: DataTypes.STRING,
    secondary_phone: DataTypes.STRING,

    dob: DataTypes.DATE,
    blood_type: DataTypes.STRING,
    alergies: DataTypes.STRING,
    notes: DataTypes.TEXT,

    insurance_number: DataTypes.STRING,
    insurance_provider: DataTypes.STRING,
    address_line: DataTypes.STRING,
    address_line2: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    clinic_id: DataTypes.INTEGER
  }, {});
  Patient.associate = function({Clinic, Visit}) {
    Patient.belongsTo(Clinic, { foreignKey: 'clinic_id' });
    Patient.hasMany(Visit, { onDelete: 'cascade' });
  };
  return Patient;
};