module.exports = function(sequelize, DataTypes){
    const Question = sequelize.define('Question',
        {
            pk : {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement : true,
            },
            
            title : {
                type : DataTypes.STRING,
                validate : {
                    len : [0,50]
                },
                allowNull : true
            },
            book : {
                type : DataTypes.STRING,
                validate : {
                    len : [0,50]
                },
                allowNull : true
            },
            writer : {
                type : DataTypes.STRING,
                validate : {
                    len : [0,50]
                },
                allowNull : true
            },
            pageFrom : {
                type : DataTypes.STRING,
                validate : {
                    len : [0,50]
                },
                allowNull : true
            },
            pageTo : {
                type : DataTypes.STRING,
                validate : {
                    len : [0,50]
                },
                allowNull : true
            },
            publisher : {
                type : DataTypes.STRING,
                validate : {
                    len : [0,50]
                },
                allowNull : true
            },
            major : {
                type : DataTypes.STRING,
                validate : {
                    len : [0,50]
                },
                allowNull : true
            },
            content_html : {
                type : DataTypes.TEXT,
                allowNull : true
            },
            content_text : {
                type : DataTypes.TEXT,
                allowNull : true
            },
            point : {
                type : DataTypes.STRING,
                validate : {
                    len : [0,50]
                },
                allowNull : true
            },

        },{
            tableName : 'Question'
        }   
    );


    Question.associate = (models) => {
        Question.hasMany(
            models.Answer,
            {
                as: 'Answer', 
                foreignKey: 'question', 
                sourceKey: 'pk' , 
                onDelete: 'CASCADE'
            }
        )

        Question.belongsTo(
            models.User, 
            { as :'Qusetioner',  foreignKey: 'questioner', targetKey: 'pk'} 
        );
    }

    return Question;
}
