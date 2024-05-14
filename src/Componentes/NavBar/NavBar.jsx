import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css'; // Importa la hoja de estilos
import unacImage from '../../Imagenes/UNAC_Blanco.png';
import { IoHome } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { BsPersonVcardFill } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';

export function NavBar() {
  // Obtener la ubicación actual
  const location = useLocation();

  // Verificar si la ubicación es la página de inicio de sesión (Login)
  const isLoginPage = location.pathname === '/';

  if (isLoginPage) {
    // No mostrar la barra de navegación en la página de inicio de sesión
    return null;
  }

  return (
    <>
      <nav>
        <div id="logos-container">
        <a href="inicio">
          <img src={unacImage} className="rounded float-start" alt="Logo UNAC" />
        </a>
          <div>
            <ul id="navbar">
              <li>
                <NavLink to="inicio"><IoHome className="icon1" /></NavLink>
              </li>
              <li>
                <NavLink to="verAspirante"><BsPersonVcardFill className="icon1" /></NavLink>
              </li>
              <li>
                <NavLink to="/"><IoLogOut className="icon1" /></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}