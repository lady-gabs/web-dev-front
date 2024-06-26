import React, { useEffect, useState, useContext } from 'react';
import './usuariosStyle.css';
import { SidebarContext } from '../../components/sidebar/SidebarContext.js';

export default function Usuarios() {
  const { isSidebarActive } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ login: '', nome: '', password: '', cpf: '', cnpj: '' , telefones: ['']});
  const [formError, setFormError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsuarios = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/auth/usuarios', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);

        // Pegando as chaves do primeiro objeto como nomes das colunas
        if (data.length > 0) {
          setColumns(Object.keys(data[0]));
        }
      } else {
        console.error('Erro ao buscar os dados.');
        setError('Erro ao buscar os dados.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro na requisição');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTelefoneChange = (e, index) => {
    const { value } = e.target;
    const updatedTelefones = newUser.telefones.map((telefone, i) => i === index ? value : telefone);
    setNewUser(prevState => ({
      ...prevState,
      telefones: updatedTelefones
    }));
  };

  const addTelefoneField = () => {
    setNewUser(prevState => ({
      ...prevState,
      telefones: [...prevState.telefones, '']
    }));
  };

  const removeTelefoneField = (index) => {
    const updatedTelefones = newUser.telefones.filter((_, i) => i !== index);
    setNewUser(prevState => ({
      ...prevState,
      telefones: updatedTelefones
    }));
  };

  const validateForm = () => {
    if ((newUser.cpf && newUser.cnpj) || (!newUser.cpf && !newUser.cnpj)) {
      setFormError('Por favor, preencha apenas um dos campos: CPF ou CNPJ.');
      return false;
    }
    setFormError('');
    return true;
  };

  const insertNewUser = async () => {
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('token');
    const payload = {
      login: newUser.login,
      nome: newUser.nome,
      password: newUser.password,
      cpf: newUser.cpf,
      cnpj: newUser.cnpj,
      telefones: newUser.telefones,
    };

    console.log('Payload:', payload); // Log para depuração

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        let data;
        const responseText = await response.text();
        if (responseText) {
          try {
            data = JSON.parse(responseText);
          } catch (jsonError) {
            console.error('Erro ao processar o JSON da resposta:', jsonError);
            setError('Erro ao processar a resposta do servidor.');
            return;
          }
        }
        
        if (data) {
          setData(prevData => [...prevData, data]);
        }
        setNewUser({ login: '', nome: '', password: '', cpf: '', cnpj: '', telefones: [''] }); // Limpa o formulário
        setIsModalOpen(false); // Fecha o modal após a inserção
      } else {
        const errorText = await response.text();
        console.error('Erro ao inserir o usuário:', errorText);
        setError('Erro ao inserir o usuário.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro na requisição');
    }
  };

  const deleteUser = async (userId) =>  {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/auth/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.ok) {
        setData(prevData => prevData.filter(user => user.id !== userId));
      } else {
        console.error('Erro ao deletar o usuário.');
        setError('Erro ao deletar o usuário.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro na requisição');
    }
  }

  const renderCellContent = (content) => {
    if (typeof content === 'object' && content !== null) {
      return JSON.stringify(content);
    }
    return content;
  };

  return (
    <div id='div-usuarios' className={`table ${isSidebarActive ? 'with-sidebar' : ''}`}>
      <h2>Usuários</h2>

      <button class='btn-user' onClick={() => setIsModalOpen(true)}>Inserir novo usuário</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <form onSubmit={(e) => { e.preventDefault(); insertNewUser(); }}>
              <input 
                type="text" 
                name="nome" 
                value={newUser.nome} 
                onChange={handleInputChange} 
                placeholder="Nome" 
                required 
              />
              <input 
                type="email" 
                name="login" 
                value={newUser.login} 
                onChange={handleInputChange} 
                placeholder="Email" 
                required 
              />
              <input 
                type="password" 
                name="password" 
                value={newUser.password} 
                onChange={handleInputChange} 
                placeholder="Senha" 
                required 
              />
              <div>
                <label>Telefones:</label>
                {newUser.telefones.map((telefone, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={telefone}
                      onChange={(e) => handleTelefoneChange(e, index)}
                      placeholder="Telefone"
                      required
                    />
                    <button class='btn-user' type="button" onClick={() => removeTelefoneField(index)}>Remover</button>
                  </div>
                ))}
                <button class='btn-user' type="button" onClick={addTelefoneField}>Adicionar Telefone</button>
              </div>
              <input 
                type="text" 
                name="cpf" 
                value={newUser.cpf} 
                onChange={handleInputChange} 
                placeholder="CPF" 
              />
              <input 
                type="text" 
                name="cnpj" 
                value={newUser.cnpj} 
                onChange={handleInputChange} 
                placeholder="CNPJ" 
              />
              {formError && <p style={{ color: 'red' }}>{formError}</p>}
              <button class='btn-user' type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}

      <div>
        {error && <p>{error}</p>}
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Delete</th>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <button onClick={() => deleteUser(item.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                      </svg>
                    </button>
                  </td>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>{renderCellContent(item[column])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum dado disponível</p>
        )}
      </div>
    </div>
  );
};
