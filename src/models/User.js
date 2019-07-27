'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName2: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    accountId: DataTypes.INTEGER,
    verificationToken: DataTypes.STRING, 
    expVerificationToken: DataTypes.DATE,
  }, {});

  User.associate = function({Clinic}) {
    User.belongsTo(Clinic, { foreignKey: 'accountId' });
  };
  return User;
};