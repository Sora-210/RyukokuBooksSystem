'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    genre: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Request.associate = function(models) {
    // associations can be defined here
  };
  return Request;
};