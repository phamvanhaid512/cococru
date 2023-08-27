const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require('./index.js');
const TaskModel = require('../models/TaskModel.js')
const minigameModel = sequelize.define('minigame', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
  logo: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks', // Tên bảng liên quan
      key: 'id' // Khóa chính của bảng liên quan
    }
  }
});
minigameModel.belongsTo(TaskModel,{ foreignKey: 'taskId', as: 'relaMinigame' });
TaskModel.hasMany(minigameModel,{ foreignKey: 'taskId', as: 'relaTaskMN' });
sequelize.sync()
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating User table: ', error);
  });
module.exports = minigameModel