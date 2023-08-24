const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require('./index.js');
const  CategoryModule = require ('./CategoriesModel');
const QuestionsModule = sequelize.define("questions", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  question: {
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
  },
  time: {
    type: DataTypes.INTEGER
  },
  categoryId: { // Thêm trường categoryId để đại diện cho khóa ngoại
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories', // Tên bảng liên quan
      key: 'id' // Khóa chính của bảng liên quan
    }
  }
});
// Định nghĩa liên kết
QuestionsModule.belongsTo(CategoryModule, { foreignKey: 'categoryId', as: 'category' });
CategoryModule.hasMany(QuestionsModule, { foreignKey: 'categoryId', as: 'questions' });

QuestionsModule.sync()
  .then(() => {
    console.log('Question table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

module.exports = QuestionsModule;