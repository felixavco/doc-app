'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define('Visit', {
    temperature: DataTypes.DOUBLE,
    blood_presure: DataTypes.STRING,
    height: DataTypes.DOUBLE,
    weight: DataTypes.DOUBLE,
    diagnose: DataTypes.STRING,
    notes: DataTypes.TEXT,
    patient_id: DataTypes.INTEGER,
    doctor: DataTypes.STRING,
    doctor_id: DataTypes.INTEGER,
  }, {});
  Visit.associate = function({ Patient, User }) {
    Visit.belongsTo(Patient, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
    Visit.belongsTo(User, { foreignKey: 'doctor_id' });
  };
  return Visit;
};