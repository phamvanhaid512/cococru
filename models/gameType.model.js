

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('GameType', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
       name:{
        type:DataTypes.STRING
       }
    })
    Model.associate = function(models) {
        Model.belongsToMany(models.Minigame,{
            through:'MinigameType',
            foreignkey:'type_id',
            otherKey:'minigame_id',
            as:'typeMinigame',
            attributes:[]
        })
    }
    sequelize.sync().then(() => {
        console.log("Table 'Type' has been created.")
    }).catch((error) => {
        console.error("Error creating 'Type' table:", error)
    })
    return Model;
}