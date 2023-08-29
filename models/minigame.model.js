const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'Minigame',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            logo: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'minigames'
        }
    );

    // Thêm dòng tạo bảng
    sequelize.sync()
        .then(() => {
            console.log("Table 'minigames' has been created.");
        })
        .catch((error) => {
            console.error("Error creating 'minigames' table:", error);
        });

    Model.associate = function (models) {
        Model.hasMany(models.Task,{ foreignKey: 'minigameId', as: 'minigame' });
    }

    return Model;
};
