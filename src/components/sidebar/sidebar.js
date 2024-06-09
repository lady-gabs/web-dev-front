import React, { useState } from 'react';
import './sidebarStyle.css';

const Sidebar = () => {
  const [selected, setSelected] = useState('home');

  const handleSelection = (item) => {
    setSelected(item);
  };

  return (
      <aside>
        <div className="sidebar">
          <ul>
            <li className={selected === 'home' ? 'selected' : ''}><a href="home" onClick={() => handleSelection('home')}>Home</a></li>
            <li className={selected === 'produtos' ? 'selected' : ''}><a href="produtos" onClick={() => handleSelection('produtos')}>Produtos</a></li>
            <li className={selected === 'estoque' ? 'selected' : ''}><a href="estoque" onClick={() => handleSelection('estoque')}>Estoque</a></li>
            <li className={selected === 'usuarios' ? 'selected' : ''}><a href="usuarios" onClick={() => handleSelection('usuarios')}>Usuários</a></li>
            <li className={selected === 'sair' ? 'selected' : ''}><a href="sair" onClick={() => handleSelection('sair')}>Sair</a></li>
          </ul>
        </div>
      </aside>
  );
};

export default Sidebar;
