const db = require('./db');
const md5 = require('md5');

class UsuarioModel{
    constructor(id, nome, email, senha){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    static async autenticar(email, senha){
        let usuario = await db.query(`SELECT * FROM usuario WHERE email = '${email}' AND senha = '${md5(senha)}'`);
        return usuario;
    }
}

module.exports = UsuarioModel;