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
            time: {
              type: DataTypes.INTEGER
            },
            explain: {
              type: DataTypes.TEXT
            },
            careerId: {
                type: DataTypes.INTEGER,
            },
          },
        {
            tableName: 'questions'
        }
    );

    // Thêm dòng tạo bảng
    sequelize.sync()
        .then(() => {
            console.log("Table 'question' has been created.");
        })
        .catch((error) => {
            console.error("Error creating 'minigames' table:", error);
        });

    Model.associate = function (models) {
        Model.hasMany(models.Answer,{ foreignKey: 'questionId', as: 'questions' });
    }

    return Model;
};