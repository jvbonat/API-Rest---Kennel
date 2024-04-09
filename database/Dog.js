
const Sequelize = require('sequelize');
const connection = require('./database');
const Dog = connection.define('dogs',{

    name : {
        type : Sequelize.STRING,
        allowNull : false
    },

    weigth : {
        type : Sequelize.FLOAT,
        allowNull : false
    },

    age : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

    breed : {
        type : Sequelize.STRING,
        allowNull : false
    }

});

//Dog.sync({force:true});
module.exports = Dog;