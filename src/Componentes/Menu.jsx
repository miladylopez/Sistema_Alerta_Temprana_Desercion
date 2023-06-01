import React from 'react';
import './Menu.css';

import profileImage from './Imagenes/UNAC_Yellow.png';

export function Menu() {
  return (
    <header className="menu-header">
      <div className="menu-logo">
        <img src={profileImage} alt="Logo UNAC" className="profile-image" />
      </div>
      <nav className="menu-nav">
        <ul className="menu-list">
          <li className="menu-item">Inicio</li>
          <li className="menu-item">Portafolio</li>
          <li className="menu-item">Perfil</li>
        </ul>
      </nav>
    </header>
  );
}
