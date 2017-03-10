module.exports = function(app){    
    var controller = app.controllers.requisicao;    
    //var conn = app.infra.connectionFactory;
    app.route('/api/requisicoes')
        .get(controller.getRequisicoes)
        .post(controller.salva);        
    
    app.route('/api/requisicoes/:id?')
        .get(controller.getRequisicao)
        .delete(controller.delete);

    app.route('/api/requisicoespendentes')
        .get(controller.getRequisicoesPendentes)
        .post(controller.salva);         
};