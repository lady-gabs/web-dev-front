// sidebar.js
import React, { useContext, useState } from 'react';
import './sidebarStyle.css';
import { ReactComponent as SidebarIcon } from '../../assets/sidebar-icon.svg';
import { SidebarContext } from './SidebarContext'; // Certifique-se de ajustar o caminho conforme necessário

const Sidebar = () => {
  const { isSidebarActive, toggleSidebar } = useContext(SidebarContext);
  const [selected, setSelected] = useState('home');

  const handleSelection = (item) => {
    setSelected(item);
  };

  return (
    <div>
      <button onClick={toggleSidebar} className='btn-sidebar'>
        <SidebarIcon className='three-lines' />
      </button>
      <aside>
        <div id='sidebar' className={isSidebarActive ? 'active' : 'closed'}>
          <ul>
            <li className={selected === 'home' ? 'selected' : ''}><a href="home" onClick={() => handleSelection('home')}>Home</a></li>
            <li className={selected === 'produtos' ? 'selected' : ''}><a href="produtos" onClick={() => handleSelection('produtos')}>Produtos</a></li>
            <li className={selected === 'estoque' ? 'selected' : ''}><a href="estoque" onClick={() => handleSelection('estoque')}>Estoque</a></li>
            <li className={selected === 'usuarios' ? 'selected' : ''}><a href="usuarios" onClick={() => handleSelection('usuarios')}>Usuários</a></li>
            <li className={selected === 'sair' ? 'selected' : ''}><a href="sair" onClick={() => handleSelection('sair')}>Sair</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;