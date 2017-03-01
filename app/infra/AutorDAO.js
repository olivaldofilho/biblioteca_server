
function AutorDAO(conn, id){
    this._conn = conn;
    this._id = id;
}

AutorDAO.prototype.getAutores = function(callback){
    this._conn.query('select * from autor', callback);
}

AutorDAO.prototype.getAutor = function (callback){
    this._conn.query('select * from autor where id = ?', [this._id], callback);
}

AutorDAO.prototype.delete = function(callback){
    this._conn.query('delete from autor where id = ?', [this._id], callback);
}

AutorDAO.prototype.salva = function(autor, callback){
    var campo = '';
    var valor = '';
    var sql = '';

    if (!autor.id){
        campo = 'nome';
        valor = '?';        
        sql = 'insert into autor (' + campo + ') values (' + valor + ')'; 
        this._conn.query(sql, [autor.nome], callback);    
    }else{             
        sql = 'update autor set ';
        sql += ' nome = ? '
        sql += ' where id = ?';
        this._conn.query(sql, [autor.nome, autor.id], callback);    
    };
};


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