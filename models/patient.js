'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Patient.hasMany(models.Disease,{as:'diseases',foreignKey:'patientId'});
      // Patient.hasMany(models.Treatment,{as:'treatments',foreignKey:'patientId'});
      Patient.hasMany(models.Medicine,{as:'medicines',foreignKey:'patientId'})

      Patient.hasMany(models.Treatment,{as:'treatments',foreignKey:'patientId'})
    }
  }
  Patient.init({
    patientName: DataTypes.STRING,
    sex: DataTypes.STRING,
    PhoneNo: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};