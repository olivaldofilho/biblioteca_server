var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function(){
    var app = express();
    
    //configuração de ambiente
    app.set('port', (process.env.PORT || 10000));
    
    //middleware
    //app.use(express.static('./app'));
    //app.set('view engine', 'ejs');
    //app.set('views', './app/partials');
    app.all("/api/*", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      return next();
    });
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    
    //home(app);    
    load('models', {cwd: 'app'})      
      .then('controllers')
      .then('routers')
      .then('infra')
      .into(app);
    
    return app;
};