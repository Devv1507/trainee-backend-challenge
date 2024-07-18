'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    limitDate: DataTypes.DATE
  }, {
    timestamps: true,
  });
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id"
    });
  };
  return Task;
};
