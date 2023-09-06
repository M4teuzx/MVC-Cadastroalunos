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

    static async listarAlunos() {
        try {
            const query = 'SELECT * FROM alunos ORDER BY id ASC';
            const alunos = await db.query(query);
            return alunos;
        } catch (error) {
            throw error;
        }
    }

    async salvar() {
        try {
            const query = `
                INSERT INTO alunos (id, nome, numero_matricula, rg, cpf, endereco, foto, usuario_id)
                VALUES ('${this.id}', '${this.nome}', '${this.numero_matricula}', '${this.rg}', '${this.cpf}', '${this.endereco}', '${this.foto}', '${this.usuario_id}')
            `;

            const res = await db.query(query);
            return res.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async deleteAluno(id) {
        try {
            const query = `DELETE FROM alunos WHERE id = ${id}`;
            const res = await db.query(query);
            return res.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async update() {
        try {
            const query = `
                UPDATE alunos
                SET
                    nome = '${this.nome}',
                    numero_matricula = '${this.numero_matricula}',
                    rg = '${this.rg}',
                    cpf = '${this.cpf}',
                    endereco = '${this.endereco}',
                    foto = '${this.foto}',
                    usuario_id = '${this.usuario_id}'
                WHERE id = ${this.id}
            `;
    
            const res = await db.query(query);
            return res.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        console.log('ID recebido:', id);
        const query = `SELECT * FROM alunos WHERE id = ${id}`;
        const [aluno] = await db.query(query);
        console.log('Resultado da consulta:', aluno);
        
        if (aluno.length === 0) {
            return null;
        }
        
    // EU NAO SEI NAO SEI EU DESISTO DE PROGRAMAR E DE VIVER EU ODEIO NODE.JS
    console.log('Resultado da consulta:', Aluno.nome);
        return new Aluno(
            aluno[0].id,
            aluno[0].nome,
            aluno[0].numero_matricula,
            aluno[0].rg,
            aluno[0].cpf,
            aluno[0].endereco,
            aluno[0].foto,
            aluno[0].usuario_id
        );

    }

}




module.exports = Aluno;
