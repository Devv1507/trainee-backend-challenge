'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    timestamps: true,
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      foreignKey: "userId",
      sourceKey: "id"
    });
  };
  User.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  return User;
};
