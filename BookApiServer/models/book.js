'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    isbn: DataTypes.INTEGER,
    uuid: DataTypes.STRING,
    price: DataTypes.INTEGER,
    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    auther: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};