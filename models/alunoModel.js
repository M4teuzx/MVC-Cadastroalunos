const db = require('./db');

class Aluno { 
    constructor(id, nome, numero_matricula, rg, cpf, endereco, foto, usuario_id) { 
    this.id = id; 
    this.nome = nome;
    this.numero_matricula = numero_matricula;
    this.rg = rg;
    this.cpf = cpf;
    this.endereco = endereco;
    this.foto = foto;
    this.usuario_id = usuario_id;
    } 

    //NAO SEI NAO SEI NAO
    static listarAlunos() {
        let alunos = db.query('SELECT * FROM alunos ORDER BY id ASC');
        return alunos;
    }

    async salvar() {
        let res = await db.query(`INSERT INTO alunos (id, nome, numero_matricula, rg, cpf, endereco, foto, usuario_id) VALUES ('${this.id}', '${this.nome}', '${this.numero_matricula}', '${this.rg}', '${this.cpf}', '${this.endereco}', '${this.foto}', '${this.id_usuario}')`);
    }

    static async deleteAluno(id) {
        let res = await db.query(`DELETE FROM alunos WHERE id = ${id}`);
        return true;
    }
} 
    
module.exports = Aluno;