module.exports = function(app){    
    var controller = app.controllers.cliente;    
    
    app.route('/api/clientes')
        .get(controller.getClientes)
        .post(controller.salva);        
    
    app.route('/api/clientes/:id')
        .get(controller.getCliente)
        .delete(controller.delete);          
};