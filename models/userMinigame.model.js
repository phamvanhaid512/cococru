
module.exports = (sequelize,DataTypes) => {
    var Model  = sequelize.define('UserMinigame',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        minigame_id:{
            type:DataTypes.INTEGER
        },
        user_id:{
            type:DataTypes.INTEGER
        },
    },
    {
        tableName: 'UserMinigame',
        autoIncrement: true, // Tự động tạo auto-increment ID
        autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
    })
    Model.associate = function(models) {
        Model.belongsTo(models.Minigame,{foreignKey:'minigame_id',as:'minigameUser'})
        Model.belongsTo(models.User,{foreignKey:'user_id',as:'userMinigame'})
   
    }
    return Model;
}