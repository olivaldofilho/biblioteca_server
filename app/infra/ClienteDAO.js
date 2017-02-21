
function ClienteDAO(conn, id){
    this._conn = conn;
    this._id = id;
}

ClienteDAO.prototype.getClientes = function(callback){
    this._conn.query('select * from cliente', callback);
}

ClienteDAO.prototype.getCliente = function (callback){
    this._conn.query('select * from cliente where id = ?', + this._id, callback);
}

ClienteDAO.prototype.delete = function(callback){
    this._conn.query('delete from cliente where id = ?', this._id, callback);
}

ClienteDAO.prototype.salva = function(cliente, callback){
    var campo = '';
    var valor = '';
    
    if (!cliente.id){
        campo = 'nome';
        valor = "'" + cliente.nome + "'";        
        var sql = 'insert into cliente (' + campo + ') values (' + valor + ')'; 
        this._conn.query(sql, callback);    
    }else{
        valor = "nome = '" + cliente.nome + "'";      
        var sql = 'update cliente set ' + valor;
        sql += " where id = " + cliente.id;
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
    return ClienteDAO;
}