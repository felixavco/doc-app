'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    name: DataTypes.STRING, 
    domain: DataTypes.STRING
  }, {});
  Account.associate = function(models) {
    Account.hastMany(models.User);
  };
  return Account;
};