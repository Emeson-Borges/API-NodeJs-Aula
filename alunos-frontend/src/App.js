import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

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
        const novoAluno = response.data;
        setAlunos([...alunos, novoAluno]);
        setNome('');
      })
      .catch(error => {
        console.error("Houve um erro ao adicionar o aluno!", error);
      });
  };
  
  

  const handleDelete = (id) => {
    console.log("Deleting student with ID:", id); // Adicionando um log para verificar o ID
    // Excluir um aluno
    axios.delete(`http://localhost:3001/alunos/${id}`)
      .then(() => {
        setAlunos(alunos.filter(aluno => aluno.id !== id));
      })
      .catch(error => {
        console.error("Houve um erro ao excluir o aluno!", error);
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
      {alunos.map((aluno) => (
      <li key={aluno.id}>
        {aluno.nome}
        <button onClick={() => handleDelete(aluno.id)}>Excluir</button>
      </li>
    ))}
      </ul>
    </div>
  );
}

export default App;
