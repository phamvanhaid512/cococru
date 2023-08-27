const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require('./index.js');
const QuestionsModule  = require('./QuestionsModel.js')
const AnswerModule = sequelize.define("answer", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  contentAs: {
    type: DataTypes.STRING
  },
  isCorrect: {
    type: DataTypes.BOOLEAN
  }
  ,questionId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'questions', // Tên bảng liên quan
      key: 'id' // Khóa chính của bảng liên quan
    }
  }
});
// Định nghĩa liên kết
AnswerModule.belongsTo(QuestionsModule, { foreignKey: 'questionId', as: 'relaAnswer' });
QuestionsModule.hasMany(AnswerModule, { foreignKey: 'questionId', as: 'relaQuestions' });
AnswerModule.sync()
  .then(() => {
    console.log('Answer table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

module.exports = AnswerModule;