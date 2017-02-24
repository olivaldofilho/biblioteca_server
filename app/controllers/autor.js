module.exports = function(app){
    var controller = {};

    controller.getAutores = function(req, res){
        var conn = app.infra.connectionFactory();
        var autorDAO = new app.infra.AutorDAO(conn, 0); 
        
        autorDAO.getAutores(function(err, results){
            console.log('Entrou na lista');
            if (err){                 
                res.status(400).json(err);
            }else{                
                res.status(200).json(results); 
            }              
        });        
        conn.end();
    };

    controller.getAutor = function (req, res){
        var id = req.params.id;
        var conn = app.infra.connectionFactory();
        var autorDAO = new app.infra.AutorDAO(conn, id);        
        autorDAO.getAutor(function(err, results){
            res.status(200).json(results[0]);
        });
    }

    controller.salva = function(req, res){
        var autor = req.body;
        var conn = app.infra.connectionFactory();
        var autorDAO = new app.infra.AutorDAO(conn, 0);
        autorDAO.salva(autor, function(erros, results){
            if (erros){
                res.status(400).json(erros);                
            }else{                
                var autorDAO1 = new app.infra.AutorDAO(conn, results.insertId);
                autorDAO1.getAutor(function(err, results){                  
                    res.status(200).json(results[0]);
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
        var autorDAO = new app.infra.AutorDAO(conn,  id);        
        autorDAO.delete(function(err, results){
            res.status(200).json('Ok');            
        });      
    }

    function getAutorById(id){
        var conn = app.infra.connectionFactory();
        var autorDAO = new app.infra.AutorDAO(conn, id);
        
        autorDAO.getAutor(function(err, results){            
            return results[0];
            //res.json(results[0]);
        });
    };
    return controller;
};