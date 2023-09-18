const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      question: {
        type: DataTypes.TEXT
      },
      explain: {
        type: DataTypes.TEXT
      },
      timeStart:{
        type:DataTypes.DATE //chỉ lấy phút và giây
      },
      careerId: {
        type: DataTypes.INTEGER,
      },
      taskId: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'questions',
      autoIncrement: true, // Tự động tạo auto-increment ID
      autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
    }
  );
  sequelize.sync()
    .then(() => {
      console.log("Table 'question' has been created.");
    })
    .catch((error) => {
      console.error("Error creating 'minigames' table:", error);
    });
  Model.associate = function (models) {
    Model.hasMany(models.Answer, { foreignKey: 'questionId', as: 'answer' });
    Model.belongsTo(models.Task, { foreignKey: 'taskId', as: 'questionTask' });
  }

  return Model;
};
