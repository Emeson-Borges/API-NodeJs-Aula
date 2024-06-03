import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    // Obter a lista de alunos da API
    axios.get('http://localhost:3001/alunos')
      .then(response => {
        setAlunos(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os alunos!", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Adicionar um novo aluno
    axios.post('http://localhost:3001/alunos', { nome })
      .then(response => {
        setAlunos([...alunos, response.data]);
        setNome('');
      })
      .catch(error => {
        console.error("Houve um erro ao adicionar o aluno!", error);
      });
  };

  return (
    <div className="App">
      <h1>Cadastro de Alunos</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          placeholder="Nome do aluno" 
          required 
        />
        <button type="submit">Cadastrar</button>
      </form>
      <h2>Lista de Alunos</h2>
      <ul>
        {alunos.map((aluno, index) => (
          <li key={index}>{aluno.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
