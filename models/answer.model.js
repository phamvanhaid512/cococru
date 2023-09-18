const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'Answer',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            answer: {
                type: DataTypes.STRING
            },
            isCorrect: {
                type: DataTypes.BOOLEAN
            },questionId: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'answers',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    sequelize.sync()
        .then(() => {
            console.log("Table 'Answer' has been created.");
        })
        .catch((error) => {
            console.error("Error creating 'Answer' table:", error);
        });
    Model.associate = function (models) {
        Model.belongsTo(models.Question, { foreignKey: 'questionId', as: 'relaAnswer' });
    }
    return Model;
};
