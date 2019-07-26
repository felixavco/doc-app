'use strict';
module.exports = (sequelize, DataTypes) => {

  const Account = sequelize.define('Account', {
    name: DataTypes.STRING, 
    domain: DataTypes.STRING
  }, {});

  Account.associate = function ({User}) {
    Account.hasMany(User);
  };
  return Account;
};