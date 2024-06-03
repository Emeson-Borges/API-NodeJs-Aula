const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Banco de dados em memória
let alunos = [];

// Rota para obter todos os alunos
app.get('/alunos', (req, res) => {
  res.json(alunos);
});

// Rota para adicionar um novo aluno
app.post('/alunos', (req, res) => {
    const aluno = req.body;
    aluno.id = alunos.length ? alunos[alunos.length - 1].id + 1 : 1; // Adiciona um ID único
    alunos.push(aluno);
    res.status(201).json(aluno);
  });
  

// Rota para deletar um aluno pelo ID
app.delete('/alunos/:id', (req, res) => {
    const { id } = req.params;
    alunos = alunos.filter(aluno => aluno.id !== parseInt(id));
    res.status(204).send();
  });
  

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
