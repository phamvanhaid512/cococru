const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'GameHistory', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        startTime:{
            type:DataTypes.STRING
        },
        endTime:{
            type:DataTypes.STRING
        },
        minigameId:{ 
            type:DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER
        }
    },
        {
            tableName: 'gameHistory',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    Model.associate = function (models) {
        Model.belongsTo(models.User, { foreignKey: 'userId', as: 'history' });
    }
    return Model;
}