import React, { useEffect, useState, useContext } from 'react';
import './produtosStyle.css';
import { SidebarContext } from '../../components/sidebar/SidebarContext.js';

export default function Produtos() {
  const { isSidebarActive } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ nome: '', preco: '', quantidade: '', estoqueId: '' });
  const [editProduct, setEditProduct] = useState({ nome: '', preco: '', quantidade: '' });
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const insertProduct = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      nome: newProduct.nome,
      preco: newProduct.preco,
      quantidade: newProduct.quantidade,
      estoqueId: newProduct.estoqueId,
    };

    try {
      const response = await fetch('http://localhost:8080/produto', {
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
        setNewProduct({ nome: '', preco: '', quantidade: '', estoqueId: '' }); // Limpa o formulário
        setIsInsertModalOpen(false); // Fecha o modal após a inserção
      } else {
        const errorText = await response.text();
        console.error('Erro ao inserir o produto:', errorText);
        setError('Erro ao inserir o produto.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro na requisição');
    }
  };

  const updateProduct = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      nome: editProduct.nome,
      preco: editProduct.preco,
      quantidade: editProduct.quantidade,
      estoqueId: editProduct.estoqueId,
    };

    try {
      const response = await fetch(`http://localhost:8080/produto/${editProduct.id}/atualiza-produto`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setData(prevData => prevData.map(product => (product.id === updatedProduct.id ? updatedProduct : product)));
        setEditProduct({ id: '', nome: '', preco: '', quantidade: '', estoqueId: '' }); // Limpa o formulário
        setIsEditModalOpen(false); // Fecha o modal após a atualização
      } else {
        const errorText = await response.text();
        console.error('Erro ao atualizar o produto:', errorText);
        setError('Erro ao atualizar o produto.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro na requisição');
    }
  };

  const deleteProduct = async (productName, stockId) => {
    const token = localStorage.getItem('token');
    const payload = {
      estoqueId: stockId,
    };

    try {
      const response = await fetch(`http://localhost:8080/produto/${productName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setData(prevData => prevData.filter(product => product.nome !== productName));
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
    <div id='div-produtos' className={`table ${isSidebarActive ? 'with-sidebar' : ''}`}>
        <h2>Produtos</h2>
        <button onClick={() => setIsInsertModalOpen(true)}>Inserir novo produto</button>
        {isInsertModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsInsertModalOpen(false)}>&times;</span>
              <form onSubmit={(e) => { e.preventDefault(); insertProduct(); }}>
                <input 
                  type="text" 
                  name="nome" 
                  value={newProduct.nome} 
                  onChange={(e) => handleInputChange(e, setNewProduct)} 
                  placeholder="Nome" 
                  required 
                />
                <input 
                  type="number" 
                  name="preco" 
                  value={newProduct.preco} 
                  onChange={(e) => handleInputChange(e, setNewProduct)} 
                  placeholder="Preço" 
                  required 
                />
                <input 
                  type="number" 
                  name="quantidade" 
                  value={newProduct.quantidade} 
                  onChange={(e) => handleInputChange(e, setNewProduct)} 
                  placeholder="Quantidade" 
                  required 
                />
                <input 
                  type="text" 
                  name="estoqueId" 
                  value={newProduct.estoqueId} 
                  onChange={(e) => handleInputChange(e, setNewProduct)} 
                  placeholder="Estoque ID" 
                  required 
                />
                <button type="submit">Inserir</button>
              </form>
            </div>
          </div>
        )}
        {isEditModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsEditModalOpen(false)}>&times;</span>
              <form onSubmit={(e) => { e.preventDefault(); updateProduct(); }}>
                <input 
                  type="text" 
                  name="nome" 
                  value={editProduct.nome} 
                  onChange={(e) => handleInputChange(e, setEditProduct)} 
                  placeholder="Nome" 
                  required 
                />
                <input 
                  type="number" 
                  name="preco" 
                  value={editProduct.preco} 
                  onChange={(e) => handleInputChange(e, setEditProduct)} 
                  placeholder="Preço" 
                  required 
                />
                <input 
                  type="number" 
                  name="quantidade" 
                  value={editProduct.quantidade} 
                  onChange={(e) => handleInputChange(e, setEditProduct)} 
                  placeholder="Quantidade" 
                  required 
                />
                <button type="submit">Atualizar</button>
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
                      <button onClick={() => {
                        setEditProduct(item);
                        setIsEditModalOpen(true);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/>
                        </svg>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteProduct(item.nome, item.estoqueId)}>
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
