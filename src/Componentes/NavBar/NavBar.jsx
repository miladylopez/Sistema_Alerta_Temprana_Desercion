import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Imag from '../../Imagenes/Perfil.jpg';
import unacImage from '../../Imagenes/UNAC_Blanco.png';

export function NavBar() {
  // Obtener la ubicación actual
  const location = useLocation();

  // Verificar si la ubicación es la página de inicio de sesión (Login)
  const isLoginPage = location.pathname === '/Login';

  if (isLoginPage) {
    // No mostrar la barra de navegación en la página de inicio de sesión
    return null;
  }

  return (
    <>
      <nav>
        <a href="index.html"></a>
        <div>
          <ul id="navbar">
            <img
              src={unacImage}
              alt="Logo UNAC"
              className="logo"
            /* style={{ width: '250px', height: '50px', marginTop: '5px' }}*/
            />
            <li>
              <NavLink to="/Login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/Ficha">Ficha</NavLink>
            </li>
            <li>
              <NavLink to="/Error">Error</NavLink>
            </li>

            <li>
              <NavLink to="/Grafica">Grafica</NavLink>
            </li>

            <img src={Imag} alt="Imagen " className="Img" />
          </ul>
        </div>
      </nav>
    </>
  );
}