import React from 'react';
import { NavLink  } from "react-router-dom";
import Logo2 from '../Imagenes/UNAC_Blanco.png';
import Imag from '../Imagenes/Perfil.jpg';
import unacImage from '../Imagenes/UNAC_Yellow.png';

export function NavBar() {
  return (
    <>
        <nav>
                <a href='index.html'></a>
            <div>
                
                 <ul id= "navbar">
                 <img src={unacImage} alt="Logo UNAC" className="logo" style={{ width: '250px', height: '50px', marginTop: '5px' }} />
                    <li><NavLink to="/Login">Login</NavLink></li>
                    <li><NavLink to="/Ficha">Ficha</NavLink></li>
                    <li><NavLink to="/Error">Error</NavLink></li>                   
                    
                    <img src={Imag} alt="Imagen " className="Img" /> 
                 </ul> 
            </div>    
        </nav>
    </>

    
  );
}