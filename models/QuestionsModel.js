const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require('./index.js');
const minigameModel = require("./MinigameModel.js");
const QuestionsModule = sequelize.define("questions", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  question: {
    type: DataTypes.TEXT
  },
  time: {
    type: DataTypes.INTEGER
  },
  explain: {
    type: DataTypes.TEXT
  },minigameId:{
   type:DataTypes.INTEGER,
   references: {
     model: 'minigames', // Tên bảng liên quan
     key: 'id' // Khóa chính của bảng liên quan
   }
  }
});
QuestionsModule.belongsTo(minigameModel,{foreignKey:"minigameId",as:"miniquestion"});
minigameModel.hasMany(QuestionsModule,{foreignKey:"minigameId",as:"miniquestion"});
QuestionsModule.sync()
  .then(() => {
    console.log('Question table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

module.exports = QuestionsModule;