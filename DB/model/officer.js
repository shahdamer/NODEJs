const { DataTypes,Model } = require('sequelize');
// const sequelize = require('sequelize');
const sequelize =require ("../connection");
const User = require('../model/user')
class Officer extends Model {}

Officer.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
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
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'Officer',
});

module.exports = Officer;
