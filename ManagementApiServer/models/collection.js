'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    isbn: DataTypes.BIGINT,
    uuid: DataTypes.UUID,
    registrationData: DataTypes.DATEONLY,
    note: DataTypes.STRING,
    ncd: DataTypes.STRING
  }, {});
  Collection.associate = function(models) {
    // associations can be defined here
  };
  return Collection;
};