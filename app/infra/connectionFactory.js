var mysql = require('mysql');
const fs = require('fs');

var connectionMysql = function(){    
    return mysql.createConnection({
            host: 'bibliotecassia.c8faq4h583ys.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'usr_biblioteca',
            password: 'G3G9I2V2',
            database: 'bibliotecassia'
    });        
};

//wrapper
module.exports = function(){
    return connectionMysql;
}   