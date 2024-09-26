
import { Sequelize } from "sequelize";
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Features',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            projectId: {
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING
            },
            indexFeatures: {
                type: DataTypes.INTEGER
            },
            mintime: {
                type: DataTypes.STRING
            },
            maxtime: {
                type: DataTypes.STRING
            }
        }
    )
    Model.associate = function(models) {
        Model.belongsToMany(models.Task,{
            through:'TaskFeatures',
            foreignKey:'features_id',
            otherkey:'task_id',
            as:'featuresTask',
            attributes:[]
        })
    }
    sequelize.sync().then(() => {
        console.log("Table 'features' has been created.")
    }).catch((error) => {
        console.error("Error creating 'Features' table:", error)
    })

    return Model;
}