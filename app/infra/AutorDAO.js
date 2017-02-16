
function AutorDAO(conn, id){
    this._conn = conn;
    this._id = id;
}

AutorDAO.prototype.getAutores = function(callback){
    this._conn.query('select * from autor', callback);
}

AutorDAO.prototype.getAutor = function (callback){
    this._conn.query('select * from autor where id = ?', + this._id, callback);
}

AutorDAO.prototype.delete = function(callback){
    this._conn.query('delete from autor where id = ?', this._id, callback);
}

AutorDAO.prototype.salva = function(autor, callback){
    var campo = '';
    var valor = '';
    
    if (!autor.id){
        campo = 'nome';
        valor = "'" + autor.nome + "'";        
        var sql = 'insert into autor (' + campo + ') values (' + valor + ')'; 
        this._conn.query(sql, callback);    
    }else{
        valor = "nome = '" + autor.nome + "'";      
        var sql = 'update autor set ' + valor;
        sql += " where id = " + autor.id;
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
    return AutorDAO;
}