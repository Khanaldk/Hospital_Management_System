'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Treatment,{as:'treatments',foreignKey:'doctorId'})
    }
  }
  User.init({
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password:DataTypes.STRING,
    Gender: DataTypes.ENUM("male","female","other"),
    Address: DataTypes.STRING,
    PhoneNo: DataTypes.BIGINT,
    UserStatus:DataTypes.ENUM('doctor','staff','manager')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};