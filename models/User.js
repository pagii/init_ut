const passwordHash = require('../helpers/passwordHash');


module.exports = function(sequelize, DataTypes){
    const User = sequelize.define('User',
        {
            pk : {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement : true,
            },
            displayname : {
                type : DataTypes.STRING,
                validate : {
                    len : [0,50]
                },
                allowNull : false
            },
            password : {
                type: DataTypes.STRING,
                validate : {
                    len : [3,100]
                },
                allowNull : false
            },

        },{
            tableName : 'User'
        }   
    );
    User.associate = (models) => {
        User.hasMany(
            models.Question, 
            {   
                as: 'Question', 
                foreignKey: 'questioner', 
                sourceKey: 'pk' , 
                onDelete: 'CASCADE'
            }
        );
        User.hasMany(
            models.Answer,
            {
                as: 'Answer', 
                foreignKey: 'answerer', 
                sourceKey: 'pk' , 
                onDelete: 'CASCADE'
            }
        )
    }
    //sequelizer hook
    User.beforeCreate((user,_)=>{
        user.password = passwordHash(user.password);
    })

    return User;
}