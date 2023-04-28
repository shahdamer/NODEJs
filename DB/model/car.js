const { DataTypes,Model } = require('sequelize');
// const sequelize = require('sequelize');
const sequelize =require ("../connection");
const User = require('../model/user')

class Car extends Model {}

Car.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  driverId: { // رقم هويته
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: { 
    type: DataTypes.STRING,
    allowNull: false,
    references: {
        model: User,
        key: 'username',
      },
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'Car',
});

module.exports = Car;
