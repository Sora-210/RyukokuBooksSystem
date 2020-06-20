'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    data_store_fron: DataTypes.INTEGER,
    from_id: DataTypes.BIGINT,
    uuid: DataTypes.STRING,
    NCD: DataTypes.INTEGER
  }, {});
  Collection.associate = function(models) {
    // associations can be defined here
  };
  return Collection;
};