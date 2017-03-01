
function ClienteDAO(conn, id){
    this._conn = conn;
    this._id = id;
}

ClienteDAO.prototype.getClientes = function(callback){
    var sql = '';
    sql = 'select';
    sql += ' id, nome, logradouro, numero, complemento, bairro, cep, cidade, pai, mae, telefone1, telefone2, telefone3';
    sql += ' from cliente';

    this._conn.query(sql, callback);
}

ClienteDAO.prototype.getCliente = function (callback){
    var sql = '';
    sql = 'select ';
    sql += ' id, nome, logradouro, numero, complemento, bairro, cep, cidade, pai, mae, telefone1, telefone2, telefone3 ';
    sql += ' from cliente';
    sql += ' where id = ?';

    this._conn.query(sql, [this._id], callback);
}

ClienteDAO.prototype.delete = function(callback){
    this._conn.query('delete from cliente where id = ?', [this._id], callback);
}

ClienteDAO.prototype.salva = function(cliente, callback){
    var campo = '';
    var valor = '';

    for (var i in cliente ) {
        if ((cliente[i] === 'null') || (cliente[i] === 'undefined')) {
            cliente[i] = '';
        }
        if ((typeof cliente[i] == 'number') && (cliente[i] == 0)){
            cliente[i] = '';
        };        
    };

    


    // for (var key in cliente) {
    //     if (cliente.hasOwnProperty(key)) {
    //         //Now, object[key] is the current value
    //         if (cliente[key] === null || (cliente[key] == 'NULL'))
    //             cliente[key] = '';
    //     };
    // };
    if (cliente.cidade == 'NULL')
        cliente.cidade = '';

    
    if (!cliente.id){
        campo = 'nome, logradouro, numero, complemento, bairro, cep, cidade, pai, mae, telefone1, telefone2, telefone3';
        valor = "'" + cliente.nome + "', ";
        valor += "'" + cliente.logradouro + "', ";
        valor += "'" + cliente.numero + "', ";
        valor += "'" + cliente.complemento + "', ";
        valor += "'" + cliente.bairro + "', ";
        valor += "'" + cliente.cep + "', ";
        valor += "'" + cliente.cidade + "',";
        valor += "'" + cliente.pai + "',";
        valor += "'" + cliente.mae + "',";
        valor += "'" + cliente.telefone1 + "',";
        valor += "'" + cliente.telefone2 + "',";
        valor += "'" + cliente.telefone3 + "'";                
        var sql = 'insert into cliente (' + campo + ') values (' + valor + ')'; 
        this._conn.query(sql, callback);    
    }else{
        valor = "nome = '" + cliente.nome + "', ";
        valor += " logradouro = '" + cliente.logradouro + "', ";
        valor += " numero = '" + cliente.numero + "', ";
        valor += " complemento = '" + cliente.complemento + "', ";
        valor += " bairro = '" + cliente.bairro + "', ";
        valor += " cep = '" + cliente.cep + "', ";
        valor += " cidade = '" + cliente.cidade + "',";
        valor += " pai = '" + cliente.pai + "',";
        valor += " mae = '" + cliente.mae + "',";
        valor += " telefone1 = '" + cliente.telefone1 + "',";
        valor += " telefone2 = '" + cliente.telefone2 + "',";
        valor += " telefone3 = '" + cliente.telefone3 + "'";
        console.log(valor);
        var sql = 'update cliente set ' + valor;
        sql += " where id = " + cliente.id;
        this._conn.query(sql, callback);    
    };
};

module.exports = function(){
    return ClienteDAO;
}