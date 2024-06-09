import React from 'react';
import './headerStyle.css';
import {ReactComponent as SidebarIcon} from '../../assets/sidebar-icon.svg';

export default function Header() {
    return (
        <header>
            <div class='sidebar-div'>
                <SidebarIcon className='three-lines'/>
                <h3>Sistema de Estoque</h3>
            </div>
        </header>
    );
}