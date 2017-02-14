var mysql = require('mysql');

var connectionMysql = function(){    
    return mysql.createConnection({
            host: 'bibliotecassia.c8faq4h583ys.us-east-1.rds.amazonaws.com',
            user: 'usr_biblioteca',
            password: 'G3G9I2V2',
            database: 'bibliotecassia'
    });    
};

//wrapper
module.exports = function(){
    return connectionMysql;
}