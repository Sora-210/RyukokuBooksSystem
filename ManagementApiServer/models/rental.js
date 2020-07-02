'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    uuid: DataTypes.STRING,
    year: DataTypes.INTEGER,
    grade: DataTypes.INTEGER,
    class: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    name: DataTypes.STRING,
    start_day: DataTypes.DATEONLY,
    return_day: DataTypes.DATEONLY
  }, {});
  Rental.associate = function(models) {
    // associations can be defined here
  };
  return Rental;
};