module.exports = function(app){    
    var controller = app.controllers.genero;    
    
    app.route('/api/generos')
        .get(controller.getGeneros)
        .post(controller.salva);        
    
    app.route('/api/generos/:id')
        .get(controller.getGenero)
        .delete(controller.delete);          
};