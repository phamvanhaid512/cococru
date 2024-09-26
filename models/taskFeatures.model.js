import Sequelize  from "sequelize";

module.exports = (sequelize,DataTypes)=> {
    var Model = sequelize.define('TaskFeatures',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        task_id:{
            type: DataTypes.INTEGER,
        },
        features_id:{
            type: DataTypes.INTEGER,
        }
    })
    Model.associate = function(models) {
        Model.belongsTo(models.Task,{foreignKey:'task_id',as:'taskFeatures'})
        Model.belongsTo(models.Features,{foreignKey:'features_id',as:'featuresTask'})        
    }
    sequelize.sync().then(()=> {
        console.log("Table 'taskFeatures' has been created.")
    }).catch((error)=> {
        console.error("Error creating 'taskFeatures' table:",error)
    })
    return Model;
} 