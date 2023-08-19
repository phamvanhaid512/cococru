
const {sequelize, DataTypes } = require("../config/config")

const UserModel = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
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
module.exports= { UserModel }