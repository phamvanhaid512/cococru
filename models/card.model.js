const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'Card',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            cardName: {
                type: DataTypes.STRING
            },
            description:{
                type:DataTypes.STRING
            },
            logoCard:{
                type:DataTypes.STRING
            },
            isDisplay:{
                type:DataTypes.BOOLEAN
            },
            gameCardId:{
                type:DataTypes.INTEGER
            }
        },
        {
            tableName: 'card',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    sequelize.sync()
        .then(() => {
            console.log("Table 'card' has been created.");
        })
        .catch((error) => {
            console.error("Error creating 'card' table:", error);
        });
    Model.associate = function (models) {
        Model.belongsTo(models.GameCard, { foreignKey: 'gameCardId', as: 'card' });
    }
    return Model;
};
