const Aluno = require('../models/alunoModel');
let alunos = [];

async function getAlunos(req, res) {
    alunos = await Aluno.listarAlunos();
    res.render('alunos', { alunos });
}

async function addAluno(req, res) {
    const { nome, numero_matricula, rg, cpf, endereco } = req.body;
    const foto = req.file.originalname;

    const aluno = new Aluno(null, nome, numero_matricula, rg, cpf, endereco, foto);
    await aluno.salvar();
    alunos.push(aluno);
    res.redirect('/aluno');
}

async function deleteAluno(req, res) {
    if (await Aluno.deleteAluno(req.params.id)) {
        res.redirect('/aluno');
    } else {
        res.redirect('/aluno');
    }
}

function updateAluno(req, res) {
    const { id, nome, numero_matricula, rg, cpf, endereco, foto } = req.body;
    alunos = alunos.map(aluno => {
        if (aluno.id == id) {
            aluno.nome = nome;
            aluno.numero_matricula = numero_matricula;
            aluno.rg = rg;
            aluno.cpf = cpf;
            aluno.endereco = endereco;
            aluno.foto = foto;
        }
        return aluno;
    });
    res.redirect('/aluno');
}

module.exports = { getAlunos, addAluno, deleteAluno, updateAluno };
