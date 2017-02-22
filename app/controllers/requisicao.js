module.exports = function(app){
    var controller = {};

    controller.getRequisicoes = function(req, res){
        var conn = app.infra.connectionFactory();
        var requisicaoDAO = new app.infra.RequisicaoDAO(conn, 0); 
        
        requisicaoDAO.getRequisicoes(function(err, results){
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

    controller.getRequisicao = function (req, res){
        var id = req.params.id;
        var conn = app.infra.connectionFactory();
        var requisicaoDAO = new app.infra.RequisicaoDAO(conn, id);        
        requisicaoDAO.getRequisicao(function(err, results){            
            //res.status(200).json('Ok');
            res.json(results[0]);
        });       
    }

    controller.salva = function(req, res){
        var autor = req.body;
        var conn = app.infra.connectionFactory();
        var requisicaoDAO = new app.infra.RequisicaoDAO(conn, 0);
        requisicaoDAO.salva(autor, function(erros, results){
            if (erros){
                res.status(400).json(erros);
                console.log('400');
            }else{
                console.log('200');            
                var requisicaoDAO1 = new app.infra.RequisicaoDAO(conn, results.insertId);
                requisicaoDAO1.getRequisicao(function(err, results){
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
        var requisicaoDAO = new app.infra.RequisicaoDAO(conn,  id);        
        requisicaoDAO.delete(function(err, results){
            res.status(200).json('Ok');            
        });      
    }

    function getRequisicaoById(id){
        var conn = app.infra.connectionFactory();
        var requisicaoDAO = new app.infra.RequisicaoDAO(conn, id);
        
        requisicaoDAO.getRequisicao(function(err, results){
            //console.log(results[0]);
            return results[0];
            //res.json(results[0]);
        });
    };
    return controller;
};