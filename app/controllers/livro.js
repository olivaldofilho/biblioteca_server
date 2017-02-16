module.exports = function(app){
    var controller = {};

    controller.getLivros = function(req, res){
        var conn = app.infra.connectionFactory();
        var livrosDAO = new app.infra.LivrosDAO(conn, 0); 
        
        livrosDAO.getLivros(function(err, results){
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

    controller.getLivro = function (req, res){
        var id = req.params.idLivro;
        var conn = app.infra.connectionFactory();
        var livrosDAO = new app.infra.LivrosDAO(conn, id);        
        livrosDAO.getLivro(function(err, results){            
            //res.status(200).json('Ok');
            res.json(results[0]);
        });       
    }

    controller.salva = function(req, res){
        var livro = req.body;
        var conn = app.infra.connectionFactory();
        var livrosDAO = new app.infra.LivrosDAO(conn, 0);
        livrosDAO.salva(livro, function(erros, results){
            if (erros){
                res.status(400).json(erros);
                console.log('400');
            }else{
                console.log('200');            
                var livrosDAO1 = new app.infra.LivrosDAO(conn, results.insertId);
                livrosDAO1.getLivro(function(err, results){
                    //res.status(200).json('Ok');            
                    res.json(results[0]);                
                });                              
            }
        });
        console.log(req.body);
    }

    controller.delete = function(req, res){
        var id = req.params.idLivro;
        console.log('Excluir o livro: ' +  id);
        var conn = app.infra.connectionFactory();
        var livrosDAO = new app.infra.LivrosDAO(conn,  id);        
        livrosDAO.delete(function(err, results){
            res.status(200).json('Ok');            
        });      
    }

    function getLivroById(id){
        var conn = app.infra.connectionFactory();
        var livrosDAO = new app.infra.LivrosDAO(conn, id);
        
        livrosDAO.getLivro(function(err, results){
            //console.log(results[0]);
            return results[0];
            //res.json(results[0]);
        });
    };
    return controller;
};