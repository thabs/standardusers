module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        cellPhone: DataTypes.STRING
    });
    
    return user;
};