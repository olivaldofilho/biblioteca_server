module.exports = function(app){    
    var controller = app.controllers.autor;    
    
    app.route('/api/autores')
        .get(controller.getAutores)
        .post(controller.salva);        
    
    app.route('/api/autores/:id')
        .get(controller.getAutor)
        .delete(controller.delete);          
};