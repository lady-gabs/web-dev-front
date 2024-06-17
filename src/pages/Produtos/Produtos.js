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
                  <th>delete</th>
                  {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>deleting...</td>
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
