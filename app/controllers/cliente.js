module.exports = function(app){
    var controller = {};

    controller.getClientes = function(req, res){
        var conn = app.infra.connectionFactory();
        var clienteDAO = new app.infra.ClienteDAO(conn, 0); 
        
        clienteDAO.getClientes(function(err, results){
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

    controller.getCliente = function (req, res){
        var id = req.params.id;
        var conn = app.infra.connectionFactory();
        var clienteDAO = new app.infra.ClienteDAO(conn, id);        
        clienteDAO.getCliente(function(err, results){            
            //res.status(200).json('Ok');
            res.json(results[0]);
        });       
    }

    controller.salva = function(req, res){
        var cliente = req.body;
        var conn = app.infra.connectionFactory();
        var clienteDAO = new app.infra.ClienteDAO(conn, 0);
        clienteDAO.salva(cliente, function(erros, results){
            if (erros){
                res.status(400).json(erros);
                console.log('400');
            }else{
                console.log('200');            
                var clienteDAO1 = new app.infra.ClienteDAO(conn, results.insertId);
                clienteDAO1.getCliente(function(err, results){
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
        var clienteDAO = new app.infra.ClienteDAO(conn,  id);        
        clienteDAO.delete(function(err, results){
            res.status(200).json('Ok');            
        });      
    }

    function getClienteById(id){
        var conn = app.infra.connectionFactory();
        var clienteDAO = new app.infra.ClienteDAO(conn, id);
        
        clienteDAO.getCliente(function(err, results){
            //console.log(results[0]);
            return results[0];
            //res.json(results[0]);
        });
    };
    return controller;
};