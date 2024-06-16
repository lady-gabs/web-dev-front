import React, { useContext } from 'react';
import './sidebarStyle.css';
import { ReactComponent as SidebarIcon } from '../../assets/sidebar-icon.svg';
import { SidebarContext } from './SidebarContext';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ client }) => {
  const { isSidebarActive, toggleSidebar } = useContext(SidebarContext);
  const location = useLocation();

  return (
    <div>
      <button onClick={toggleSidebar} className='btn-sidebar'>
        <SidebarIcon className='three-lines' />
      </button>
      <aside>
        <div id='sidebar' className={isSidebarActive ? 'active' : 'closed'}>
          <ul>
            {client ? (
              <>
                <li className={location.pathname === '/client' ? 'selected' : ''}>
                  <Link to="/client">Home</Link>
                </li>
                <li className={location.pathname === '/client/produtos' ? 'selected' : ''}>
                  <Link to="/client/produtos">Produtos</Link>
                </li>
              </>
            ) : (
              <>
                <li className={location.pathname === '/admin' ? 'selected' : ''}>
                  <Link to="/admin">Home</Link>
                </li>
                <li className={location.pathname === '/admin/produtos' ? 'selected' : ''}>
                  <Link to="/admin/produtos">Produtos</Link>
                </li>
                <li className={location.pathname === '/admin/estoque' ? 'selected' : ''}>
                  <Link to="/admin/estoque">Estoque</Link>
                </li>
                <li className={location.pathname === '/admin/usuarios' ? 'selected' : ''}>
                  <Link to="/admin/usuarios">Usuários</Link>
                </li>
              </>
            )}
            <li className={location.pathname === '/login' ? 'selected' : ''}>
              <Link to="/login">Sair</Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
