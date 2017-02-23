
function GeneroDAO(conn, id){
    this._conn = conn;
    this._id = id;
}

GeneroDAO.prototype.getGeneros = function(callback){
    this._conn.query('select id, descricao from genero', callback);
}

GeneroDAO.prototype.getGenero = function (callback){
    this._conn.query('select id, descricao from genero where id = ?', + this._id, callback);
}

GeneroDAO.prototype.delete = function(callback){
    this._conn.query('delete from genero where id = ?', this._id, callback);
}

GeneroDAO.prototype.salva = function(genero, callback){
    var campo = '';
    var valor = '';
    
    if (!genero.id){
        campo = 'descricao';
        valor = "'" + genero.descricao + "'";        
        var sql = 'insert into genero (' + campo + ') values (' + valor + ')'; 
        this._conn.query(sql, callback);    
    }else{
        valor = "descricao = '" + genero.descricao + "'";      
        var sql = 'update genero set ' + valor;
        sql += " where id = " + genero.id;
        this._conn.query(sql, callback);    
    }
}

module.exports = function(){
    return GeneroDAO;
}