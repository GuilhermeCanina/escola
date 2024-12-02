const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'escola',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM professores WHERE email = ? AND senha = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.status(200).send({ message: 'Login realizado com sucesso!', professor: results[0] });
        } else {
            res.status(401).send({ message: 'Credenciais inválidas!' });
        }
    });
});

app.post('/turmas', (req, res) => {
    const { nome, professor_id } = req.body;
    const sql = 'INSERT INTO turmas (nome, professor_id) VALUES (?, ?)';
    db.query(sql, [nome, professor_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Turma cadastrada com sucesso!' });
    });
});

app.get('/turmas/:professor_id', (req, res) => {
    const { professor_id } = req.params;
    const sql = 'SELECT * FROM turmas WHERE professor_id = ?';
    db.query(sql, [professor_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

app.delete('/turmas/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM turmas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Turma excluída com sucesso!' });
    });
});

app.post('/atividades', (req, res) => {
    const { turma_id, descricao } = req.body;
    const sql = 'INSERT INTO atividades (turma_id, descricao) VALUES (?, ?)';
    db.query(sql, [turma_id, descricao], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Atividade cadastrada com sucesso!' });
    });
});

app.get('/atividades/:turma_id', (req, res) => {
    const { turma_id } = req.params;
    const sql = 'SELECT * FROM atividades WHERE turma_id = ?';
    db.query(sql, [turma_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
