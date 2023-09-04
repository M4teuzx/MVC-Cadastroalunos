const usuarioModel = require('../models/usuarioModel');

function login(req, res) {
    res.render('login');
};

async function autenticar(req, res) {
    if(req.body.email == "" || req.body.senha == "") {
    } else {
        let resp = await usuarioModel.autenticar(req.body.email, req.body.senha);
        if(resp.length > 0){
            req.session.usuario = {
                id: resp[0].id,
                nome: resp[0].nome,
                email: resp[0].email
            };
            res.redirect('/aluno');
        }else{
            res.redirect('/login');
        }
    }
};



async function logout(req, res) {
    delete req.session.usuario;
    res.redirect('/login');
};

module.exports = { login, autenticar, logout };