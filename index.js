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
  alunos.push(aluno);
  res.status(201).json(aluno);
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
