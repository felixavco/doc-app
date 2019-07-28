'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name2: DataTypes.STRING,
    avatar: DataTypes.STRING,
    speciality: DataTypes.STRING,
    user_type: DataTypes.STRING, //* DOCTOR, NOURSE, OTHER
    role: DataTypes.STRING, //* USER, ADMIN, SUPER_ADMIN

    email: DataTypes.STRING,
    phone: DataTypes.STRING, 
    userName: DataTypes.STRING, 
    password: DataTypes.STRING,

    is_active: DataTypes.BOOLEAN,
    recovery_token: DataTypes.STRING,
    exp_recovery_token: DataTypes.DATE,

    clinic_id: DataTypes.INTEGER
  }, {
    underscored: true
  });

  User.associate = function({Clinic}) {
    User.belongsTo(Clinic, { foreignKey: 'clinic_id' });
  };
  return User;
};