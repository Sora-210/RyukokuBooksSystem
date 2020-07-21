'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    token_period: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};