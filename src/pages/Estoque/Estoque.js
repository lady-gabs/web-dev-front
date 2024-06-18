import React, { useEffect, useState, useContext } from 'react';
import './estoqueStyle.css';
import { SidebarContext } from '../../components/sidebar/SidebarContext.js';

export default function Estoque() {
  const { isSidebarActive } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);
  const [newStockName, setNewStockName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const fetchEstoque = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/estoque', {
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
    fetchEstoque();
  }, []);

  const handleInputChange = (e) => {
    setNewStockName(e.target.value);
  };

  const insertNewStock = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      nome: newStockName,
    };

    try {
      const response = await fetch('http://localhost:8080/novo-estoque', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newData = await response.json();
        setData(prevData => [...prevData, newData]);
        setNewStockName(''); // Limpa o formulário
        setIsModalOpen(false); // Fecha o modal após a inserção
      } else {
        const errorText = await response.text();
        console.error('Erro ao inserir o estoque:', errorText);
        setError('Erro ao inserir o estoque.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro na requisição');
    }
  };

  const deleteStock = async (stockId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/remover-estoque/${stockId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.ok) {
        setData(prevData => prevData.filter(stock => stock.id !== stockId));
      } else {
        console.error('Erro ao deletar o estoque.');
        setError('Erro ao deletar o estoque.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro na requisição');
    }
  };

  const renderCellContent = (content) => {
    if (typeof content === 'object' && content !== null) {
      return JSON.stringify(content);
    }
    return content;
  };

  return (
    <div id='div-estoque' className={`table ${isSidebarActive ? 'with-sidebar' : ''}`}>
      <h2>Estoque</h2>
      <button onClick={() => setIsModalOpen(true)}>Inserir novo estoque</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <form onSubmit={(e) => { e.preventDefault(); insertNewStock(); }}>
              <input 
                type="text" 
                name="nome" 
                value={newStockName} 
                onChange={handleInputChange} 
                placeholder="Nome do novo estoque" 
                required 
              />
              <button type="submit">Inserir</button>
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
                    <button onClick={() => deleteStock(item.id)}>
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
