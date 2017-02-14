
function LivrosDAO(conn, idLivro){
    this._conn = conn;
    this._idLivro = idLivro;
}

LivrosDAO.prototype.getLivros = function(callback){
    this._conn.query('select * from livros', callback);
}

LivrosDAO.prototype.getLivro = function (callback){
    console.log(this._idLivro);
    this._conn.query('select * from livros where id = ?', + this._idLivro, callback);
}

LivrosDAO.prototype.delete = function(callback){
    this._conn.query('delete from livros where id = ?', this._idLivro, callback);
}

LivrosDAO.prototype.salva = function(livro, callback){
    var campo = '';
    var valor = '';
    console.log(livro.id);
    if (!livro.id){
        campo = 'isbn, titulo, descricao';
        valor = "'" + livro.isbn + "', ";
        valor += "'" + livro.titulo + "', ";
        valor += "'" + livro.descricao + "'";
        var sql = 'insert into livros (' + campo + ') values (' + valor + ')'; 
        this._conn.query(sql, callback);    
    }else{
        valor = "isbn = '" + livro.isbn + "', ";
        valor += "titulo = '" + livro.titulo + "', ";
        valor += "descricao = '" + livro.descricao + "'";
        var sql = 'update livros set ' + valor;
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