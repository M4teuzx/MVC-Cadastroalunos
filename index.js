const express = require('express'); 
const alunosController = require('./controllers/alunosController'); 
const dotenv = require('dotenv');
const path = require('path');
const app = express(); 
const port = 3000; 
const db = require('./models/db');
const expressLayouts = require('express-ejs-layouts');
const usuarioController = require('./controllers/usuarioController');
const session = require('express-session');
const multer = require('multer');

app.use(session({secret: '1i2n3f4o'}));

app.use(expressLayouts);
app.set('layout', './layouts/default/index');
app.set('view engine', 'ejs'); 

app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/') // Diretório onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    }
});

const upload = multer({ storage: storage });

app.use((req, res, next) => {
    if (!req.session.usuario) {
        if(req.originalUrl == '/login' || req.originalUrl == '/autenticar'){
            app.set('layout', './layouts/default/login');
            res.locals.layoutVariables = {
                url: process.env.URL,
                img: "/img/",
                style: "/css/",
                title: "Login",
                usuario: req.session.usuario
            };
            next();
        }else{
            res.redirect('/login');
        }
    }else{
        app.set('layout', './layouts/default/index');
        res.locals.layoutVariables ={
            url: process.env.URL,
            img: "/img/",
            style: "/css/",
            title: "alunos",
            usuario: req.session.usuario
        };
        next();
    }
});

// Rotas

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro');
  });
  
app.get('/login', (req, res) => {
    app.set('layout', './layouts/default/login');
    usuarioController.login(req, res);
});

app.post('/login', (req, res) => {
    usuarioController.autenticar(req, res);
});

app.get('/logout', (req, res) => {
    usuarioController.logout(req, res);
});

app.get('/aluno/delete/:id', (req, res) => {
    alunosController.deleteAluno(req, res);
});

app.get('/aluno/edit/:id', (req, res) => {
    alunosController.updateAluno(req, res);
});

app.post('/aluno', upload.single('filetoupload'), alunosController.addAluno);
app.get('/aluno', alunosController.getAlunos); 
app.post('/aluno', alunosController.addAluno); 
app.delete('/aluno', alunosController.deleteAluno);
app.put('/aluno', alunosController.updateAluno);


app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});
