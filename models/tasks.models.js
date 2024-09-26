const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'Task',
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
        },
        {
            tableName: 'tasks',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    sequelize.sync()
        .then(() => {
            console.log("Table 'tasks' has been created.");
        })
        .catch((error) => {
            console.error("Error creating 'tasks' table:", error);
        });
    Model.associate = function (models) {
        Model.hasMany(models.Minigame,{foreignKey:'taskId',as:'taskMini'})
        Model.belongsToMany(models.TaskFeatures,{
            through:'TaskFeatures',
            foreignKey:'task_id',
            otherKey:'features_id',
            as:'taskFeatures',
            attributes:[]
        })
    }
    return Model;
};
