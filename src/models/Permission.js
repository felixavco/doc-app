'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    code: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, { timestamps: false });

  return Permission;
};