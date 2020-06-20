'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lend = sequelize.define('Lend', {
    status: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    school_year: DataTypes.INTEGER,
    class: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    BC_uuid: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY
  }, {});
  Lend.associate = function(models) {
    // associations can be defined here
  };
  return Lend;
};