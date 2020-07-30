'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    isbn: DataTypes.BIGINT,
    uuid: DataTypes.UUID,
    registrationData: DataTypes.DATEONLY,
    note: DataTypes.STRING,
    ndc: DataTypes.STRING,
    rentalStatus: DataTypes.BOOLEAN,
    rentalId:DataTypes.INTEGER
  }, {});
  Collection.associate = function(models) {
    // associations can be defined here
  };
  return Collection;
};