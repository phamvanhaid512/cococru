

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Minigame', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        thumbnail: {
            type: DataTypes.STRING
        },
        time: {
            type: DataTypes.STRING
        },
        taskId: {
            type: DataTypes.INTEGER
        },
        roleId: {
            type: DataTypes.INTEGER
        },
        typeId: {
            type: DataTypes.INTEGER
        }
    })
    Model.associate = function(models) {
        Model.belongsTo(models.Role,{foreignKey:'roleId',as:'minigame'})
        Model.belongsTo(models.Task,{foreignKey:'taskId',as:'minigameTask'})
        Model.belongsToMany(models.User,{
            through:'UserMinigame',
            foreignKey:'minigame_id',
            otherKey:'user_id',
            as:'minigameUser',
            attributes:[]
        })
        Model.belongsToMany(models.GameType,{
            through:'MinigameType',
            foreignkey:'type_id',
            otherKey:'minigame_id',
            as:'typeMinigame',
            attributes:[]
        })
    }
    sequelize.sync().then(() => {
        console.log("Table 'minigame' has been created.")
    }).catch((error) => {
        console.error("Error creating 'minigame' table:", error)
    })
    return Model;
}