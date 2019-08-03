'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    owner: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_time: DataTypes.DATE,
    end_time: DataTypes.TIME,
    color: DataTypes.STRING,
    patient: DataTypes.INTEGER,
    status: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    underscored: true
  });
  Event.associate = function({User, Patient}) {
    Event.belongsTo(User, { foreignKey: 'owner' });
    Event.belongsTo(Patient, { foreignKey: 'patient' });
  };
  return Event;
};