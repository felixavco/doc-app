'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name2: DataTypes.STRING,
    avatar: DataTypes.STRING,
    speciality: DataTypes.STRING,
    role: DataTypes.STRING, //* DOCTOR, NOURSE, OTHER
    permission: DataTypes.INTEGER, //* 1 = USER, 2 = ADMIN, 3 = SUPER_ADMIN

    email: DataTypes.STRING,
    phone: DataTypes.STRING, 
    user_name: DataTypes.STRING, 
    password: DataTypes.STRING,

    is_active: DataTypes.BOOLEAN,
    recovery_token: DataTypes.STRING,
    exp_recovery_token: DataTypes.DATE,

    clinic_id: DataTypes.INTEGER
  }, {
    underscored: true
  });

  User.associate = function({Clinic, Event}) {
    User.belongsTo(Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });
    User.hasMany(Event);
  };
  return User;
};