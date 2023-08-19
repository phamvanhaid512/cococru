const { Sequelize, DataTypes } = require("sequelize");
const { sequelize }  = require('./index.js')
const QuestionsModule = sequelize.define("questions", {
  question: {
    type: DataTypes.STRING
  },
  answer1: {
    type: DataTypes.STRING
  },
  answer2: {
    type: DataTypes.STRING
  },
  answer3: {
    type: DataTypes.STRING
  },
  answer4: {
    type: DataTypes.STRING
  },
  CorrectAnswer: {
    type: DataTypes.STRING

  },
  explain: {
    type: DataTypes.TEXT
  }
});

QuestionsModule.sync()
  .then(() => {
    console.log('Question table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

module.exports = QuestionsModule;