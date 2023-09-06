const Aluno = require('../models/alunoModel');

async function getAlunos(req, res) {
    const alunos = await Aluno.listarAlunos();
    res.render('alunos', { alunos });
}

async function addAluno(req, res) {
    const { nome, numero_matricula, rg, cpf, endereco } = req.body;
    const foto = req.file.originalname;
    const usuario_id = req.session.usuario.id;

    const aluno = new Aluno(null, nome, numero_matricula, rg, cpf, endereco, foto, usuario_id);
    await aluno.salvar();
    res.redirect('/aluno');
}

async function deleteAluno(req, res) {
    if (await Aluno.deleteAluno(req.params.id)) {
        res.redirect('/aluno');
    } else {
        res.redirect('/aluno');
    }
}

async function updateAluno(req, res) {
    const { id, nome, numero_matricula, rg, cpf, endereco, foto, usuario_id } = req.body;

    const aluno = await Aluno.getById(id);
    if (!aluno) {
        res.redirect('/aluno');
        return;
    }

    aluno.nome = nome;
    aluno.numero_matricula = numero_matricula;
    aluno.rg = rg;
    aluno.cpf = cpf;
    aluno.endereco = endereco;
    aluno.foto = foto;
    aluno.usuario_id = usuario_id;

    if (await aluno.update()) {
        res.redirect('/aluno');
    } else {
        res.redirect(`/aluno/edit/${id}`);
    }
}



async function editAluno(req, res) {
    const alunoId = req.params.id;

    const aluno = await Aluno.getById(alunoId);
    console.log('ID recebido:', alunoId);
    console.log('Aluno encontrado:', aluno);

    if (!aluno) {
        res.redirect('/aluno');
    } else {
        res.render('edit', { aluno });
    }
}



module.exports = { getAlunos, addAluno, deleteAluno, updateAluno, editAluno };

