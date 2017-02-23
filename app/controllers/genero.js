module.exports = function(app){
    var controller = {};

    controller.getGeneros = function(req, res){
        var conn = app.infra.connectionFactory();
        var generoDAO = new app.infra.GeneroDAO(conn, 0); 
        
        generoDAO.getGeneros(function(err, results){
            console.log('Entrou na lista');
            if (err){
                 console.log(err);
                res.status(400).json(err);
            }else{                
                console.log(results);
                res.json(results); 
            }              
        });        
        conn.end();
    };

    controller.getGenero = function (req, res){
        var id = req.params.id;
        var conn = app.infra.connectionFactory();
        var generoDAO = new app.infra.GeneroDAO(conn, id);        
        generoDAO.getGenero(function(err, results){            
            //res.status(200).json('Ok');
            res.json(results[0]);
        });       
    }

    controller.salva = function(req, res){
        var genero = req.body;
        var conn = app.infra.connectionFactory();
        var generoDAO = new app.infra.GeneroDAO(conn, 0);
        generoDAO.salva(genero, function(erros, results){
            if (erros){
                res.status(400).json(erros);
                console.log('400');
            }else{
                console.log('200');            
                var generoDAO1 = new app.infra.GeneroDAO(conn, results.insertId);
                generoDAO1.getGenero(function(err, results){
                    //res.status(200).json('Ok');            
                    res.json(results[0]);                
                });                              
            }
        });
        console.log(req.body);
    }

    controller.delete = function(req, res){
        var id = req.params.id;
        if (!id){
            res.status(400).jsaon("Id não informado");
            return;
        }
        console.log('Excluir o livro: ' +  id);
        var conn = app.infra.connectionFactory();
        var generoDAO = new app.infra.GeneroDAO(conn,  id);        
        generoDAO.delete(function(err, results){
            res.status(200).json('Ok');            
        });      
    }

    function getGeneroById(id){
        var conn = app.infra.connectionFactory();
        var generoDAO = new app.infra.GeneroDAO(conn, id);
        
        generoDAO.getGenero(function(err, results){
            //console.log(results[0]);
            return results[0];
            //res.json(results[0]);
        });
    };
    return controller;
};