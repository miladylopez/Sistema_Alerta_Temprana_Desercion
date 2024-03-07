import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css'; // Importa la hoja de estilos
import unacImage from '../../Imagenes/UNAC_Blanco.png';
import Imag from '../../Imagenes/Perfil.jpg';
import { IoHome } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { BsPersonVcardFill } from "react-icons/bs";

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
        <div id="logos-container">
          <img src={unacImage} alt="Logo UNAC" className="logo" />
          <div>
            <ul id="navbar">
              <li>
                <NavLink to="/Inicio"><IoHome className="icon" /></NavLink>
              </li>
              <li>
                <NavLink to="/Usuario"><BsPersonVcardFill className="icon" /></NavLink>
              </li>
              <li>
                <NavLink to="/Login"><IoLogOut className="icon" /></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
