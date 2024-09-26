

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('MinigameType', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        minigame_id:{
            type:DataTypes.INTEGER
        },
        type_id:{
            type:DataTypes.INTEGER
        }
    })
    Model.associate = function(models) {
        Model.belongsTo(models.Minigame,{foreignKey:'minigame_id',as:'minigameType'})
        Model.belongsTo(models.GameType,{foreignKey:'type_id',as:'typeGame'})        
    }
    sequelize.sync().then(() => {
        console.log("Table 'minigameType' has been created.")
    }).catch((error) => {
        console.error("Error creating 'minigameType' table:", error)
    })
    return Model;
}