
const { sequelize, DataTypes } = require("../config/config")

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  fullname: {
    type: DataTypes.STRING,

  },
  gender: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  nickName: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

sequelize.sync()
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating User table: ', error);
  });
  module.exports = UserModel