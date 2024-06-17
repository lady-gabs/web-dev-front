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
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/>
                        </svg>
                      </button>
                    </td>
                    <td>
                      <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
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
