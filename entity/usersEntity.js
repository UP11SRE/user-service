const { DataTypes } = require('sequelize');
const sequelize = require('../client/sequelize'); // Adjust the path to your Sequelize configuration file

const usersEntity = sequelize.define('user_details', {
  userId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  access: {
   type : DataTypes.STRING,
   unique: false,
   allowNull : false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    onUpdate: DataTypes.NOW,
  },
});

module.exports = usersEntity; // Export the User model
