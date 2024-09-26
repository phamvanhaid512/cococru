

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Project', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING
        },
        client:{
            type:DataTypes.STRING
        }
    })
    sequelize.sync().then(() => {
        console.log("Table 'Project' has been created.")
    }).catch((error) => {
        console.error("Error creating 'Project' table:", error)
    })
    return Model;
}