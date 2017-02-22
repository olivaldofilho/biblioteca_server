
function LivrosDAO(conn, idLivro){
    this._conn = conn;
    this._idLivro = idLivro;
}

LivrosDAO.prototype.getLivros = function(callback){
    this._conn.query('select * from livro', callback);
}

LivrosDAO.prototype.getLivro = function (callback){
    console.log(this._idLivro);
    this._conn.query('select * from livro where id = ?', + this._idLivro, callback);
}

LivrosDAO.prototype.delete = function(callback){
    this._conn.query('delete from livro where id = ?', this._idLivro, callback);
}

LivrosDAO.prototype.salva = function(livro, callback){
    var campo = '';
    var valor = '';
    console.log(livro.id);
    if (!livro.id){
        campo = 'isbn, titulo, descricao, idautor, localizacao';
        valor = "'" + livro.isbn + "', ";
        valor += "'" + livro.titulo + "', ";
        valor += "'" + livro.descricao + "',";
        valor += "'" + livro.idautor + "',";
        valor += "'" + livro.localizacao + "'";
        var sql = 'insert into livro (' + campo + ') values (' + valor + ')'; 
        this._conn.query(sql, callback);    
    }else{
        valor = "isbn = '" + livro.isbn + "', ";
        valor += "titulo = '" + livro.titulo + "', ";
        valor += "descricao = '" + livro.descricao + "',";
        valor += "idautor = '" + livro.idautor + "',";
        valor += "localizacao = '" + livro.localizacao + "'";
        var sql = 'update livro set ' + valor;
        sql += " where id = " + livro.id;
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
    return LivrosDAO;
}