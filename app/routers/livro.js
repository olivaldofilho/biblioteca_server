module.exports = function(app){    
    var controller = app.controllers.livro;    
    //var conn = app.infra.connectionFactory;
    app.route('/api/livros')
        .get(controller.getLivros)
        .post(controller.salva);        
    
    app.route('/api/livros/:id')
        .get(controller.getLivro)
        .delete(controller.delete);

    app.route('/api/livro/')
        .post(controller.salva);            
};