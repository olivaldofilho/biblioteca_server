
function RequisicaoDAO(conn, id){
    this._conn = conn;
    this._id = id;
}

RequisicaoDAO.prototype.getRequisicoes = function(callback){
    var sql = '';
    sql = 'select r.id, ';
    sql += '      r.data_retirada, ';
    sql += '      r.data_devolucao, ';
    sql += '      r.id_cliente, ';
    sql += '      r.id_livro, ';
    sql += '      c.nome nome_cliente, ';
    sql += '      l.titulo titulo_livro ';
    sql += ' from requisicao r, ';
    sql += '      cliente    c, ';
    sql += '      livro      l ';
    sql += 'where r.id_cliente = c.id ';
    sql += '  and r.id_livro   = l.id ';
    sql += 'order by r.data_devolucao '
    console.log(sql);
    this._conn.query(sql, callback);
}

RequisicaoDAO.prototype.getRequisicao = function (callback){
     var sql = '';
    sql = 'select r.id, ';
    sql += '      r.data_retirada, ';
    sql += '      r.data_devolucao, ';
    sql += '      r.id_cliente, ';
    sql += '      r.id_livro, ';
    sql += '      c.nome nome_cliente, ';
    sql += '      l.titulo titulo_livro ';
    sql += ' from requisicao r, ';
    sql += '      cliente    c, ';
    sql += '      livro      l ';
    sql += 'where r.id_cliente = c.id ';
    sql += '  and r.id_livro   = l.id ';
    sql += '  and r.id         = ? ';
    
    this._conn.query(sql, + this._id, callback);
}

RequisicaoDAO.prototype.delete = function(callback){
    this._conn.query('delete from requisicao where id = ?', this._id, callback);
}

RequisicaoDAO.prototype.salva = function(requisicao, callback){
    var campo = '';
    var valor = '';
    
    if (!requisicao.id){
        campo = 'data_retirada, data_devolucao, id_cliente, id_livro';
        valor = "'" + requisicao.data_retirada + "',";
        valor += "'" + requisicao.data_devolucao + "',";
        valor += "'" + requisicao.id_cliente + "',";
        valor += "'" + requisicao.id_livro + "'";
        var sql = 'insert into requisicao (' + campo + ') values (' + valor + ')'; 
        this._conn.query(sql, callback);    
    }else{
        valor = "data_retirada = '" + requisicao.nome + "'";      
        var sql = 'update requisicao set ' + valor;
        sql += " where id = " + requisicao.id;
        this._conn.query(sql, callback);    
    }    
}


/*controller.obtemContato = function(req, res){
        var idContato = req.params.id;
        var contato   = contatos.filter(function(contato) {
            return contato._id == idContato;
        })[0];
        contato ?            
            res.json(contato) :
            res.status(404).send('Contato não encontrado');
    };*/

module.exports = function(){
    return RequisicaoDAO;
}