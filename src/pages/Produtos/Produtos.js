import React, { useEffect, useState, useContext } from 'react';
import './produtosStyle.css';
import { SidebarContext } from '../../components/sidebar/SidebarContext.js';

export default function Produtos() {
  const { isSidebarActive } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);
  
  const fetchProdutos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/produto', {
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
    fetchProdutos();
  }, []);

  const updateProduct = () => {
    console.log("Updated");
  }

  const deleteProduct = () => {
    console.log("Deleted");
  }

  return (
    <div id='div-produtos' className={`table ${isSidebarActive ? 'with-sidebar' : ''}`}>
        <h2>Produtos</h2>
        <div>
          {error && <p>{error}</p>}
          {data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Update</th>
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
                      <button onClick={updateProduct}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/>
                        </svg>
                      </button>
                    </td>
                    <td>
                      <button onClick={deleteProduct}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                        </svg>
                      </button>
                    </td>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>{item[column]}</td>
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




/*

import React, { useEffect, useState, useContext } from 'react';
import './estoqueStyle.css';
import { SidebarContext } from '../../components/sidebar/SidebarContext.js';

export default function Estoque() {
  const { isSidebarActive } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);
  const [newStock, setNewStock] = useState({ nome: '', preco: '', quantidade: '', estoqueId: '' });
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
    const { name, value } = e.target;
    setNewStock(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const insertStock = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      nome: newStock.nome,
      preco: newStock.preco,
      quantidade: newStock.quantidade,
      estoqueId: newStock.estoqueId,
    };

    try {
      const response = await fetch('http://localhost:8080/estoque', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setData(prevData => [...prevData, data]);
        setNewStock({ nome: '', preco: '', quantidade: '', estoqueId: '' }); // Limpa o formulário
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
      const response = await fetch(`http://localhost:8080/estoque/${stockId}`, {
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
            <form onSubmit={(e) => { e.preventDefault(); insertStock(); }}>
              <input 
                type="text" 
                name="nome" 
                value={newStock.nome} 
                onChange={handleInputChange} 
                placeholder="Nome" 
                required 
              />
              <input 
                type="number" 
                name="preco" 
                value={newStock.preco} 
                onChange={handleInputChange} 
                placeholder="Preço" 
                required 
              />
              <input 
                type="number" 
                name="quantidade" 
                value={newStock.quantidade} 
                onChange={handleInputChange} 
                placeholder="Quantidade" 
                required 
              />
              <input 
                type="text" 
                name="estoqueId" 
                value={newStock.estoqueId} 
                onChange={handleInputChange} 
                placeholder="Estoque ID" 
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
*/