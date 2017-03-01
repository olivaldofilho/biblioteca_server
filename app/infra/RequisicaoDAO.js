
function RequisicaoDAO(conn, id){
    this._conn = conn;
    this._id = id;
}

RequisicaoDAO.prototype.getRequisicoes = function(callback){
    var sql = '';
    sql = 'select r.id, ';
    sql += '      r.data_retirada, ';
    sql += '      r.data_prevista_devolucao, ';
    sql += '      r.id_cliente, ';
    sql += '      r.id_livro, ';
    sql += '      r.data_devolucao, ';
    sql += '      r.obs_devolucao, ';
    sql += '      r.status, ';
    sql += '      c.nome nome_cliente, ';
    sql += '      l.titulo titulo_livro ';
    sql += ' from requisicao r, ';
    sql += '      cliente    c, ';
    sql += '      livro      l ';
    sql += 'where r.id_cliente = c.id ';
    sql += '  and r.id_livro   = l.id ';
    sql += 'order by r.data_devolucao desc '
    console.log(sql);
    this._conn.query(sql, callback);
}

RequisicaoDAO.prototype.getRequisicao = function (callback){
    var sql = '';
    sql = 'select r.id, ';
    sql += '      r.data_retirada, ';
    sql += '      r.data_prevista_devolucao, ';
    sql += '      r.id_cliente, ';
    sql += '      r.id_livro, ';
    sql += '      r.data_devolucao, ';
    sql += '      r.obs_devolucao, ';
    sql += '      r.status, ';
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
    var sql = '';
    
    if (!requisicao.id){
        campo = 'data_retirada, data_prevista_devolucao, id_cliente, id_livro, status';
        valor = "'" + requisicao.data_retirada + "',";
        valor += "'" + requisicao.data_prevista_devolucao + "',";
        valor += "'" + requisicao.id_cliente + "',";
        valor += "'" + requisicao.id_livro + "'";
        valor += "1";
        sql = 'insert into requisicao (' + campo + ') values (' + valor + ')'; 
        this._conn.query(sql, callback);    
    }else{
        valor = "data_retirada = '" + requisicao.data_retirada + "',";
        valor += " data_prevista_devolucao = '" + requisicao.data_prevista_devolucao + "',";
        valor += " data_devolucao = '" + requisicao.data_devolucao + "',";
        valor += " obs_devolucao = '" + requisicao.obs_devolucao + "',";
        valor += " id_cliente = '" + requisicao.id_cliente + "',";
        valor += " id_livro = '" + requisicao.id_livro + "',"; 
        valor += " status = '" + requisicao.status + "'"; 
        sql = 'update requisicao set ' + valor;
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