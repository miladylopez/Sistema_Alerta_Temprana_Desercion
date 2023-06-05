import React, { useState } from 'react';
import '../index.css'; 
import Logo2 from '../Imagenes/UNAC_Blanco.png';

export function Ficha(){
    return(
        <>
        <nav>
            <a href='index.html'></a>

            <div>
                 <ul id= "navbar">
                    <li><a href ="index.html">Inicio</a></li>
                     <li><a href ="index.html">Portafolio</a></li>
                    <li><a href ="index.html">Perfil</a></li>
                 </ul> 
                 <img src={Logo2} alt="Logo UNAC " className="logo2" />
            </div>       
        </nav>
        <div>
            <ul id= "titulo">
                <h1>FICHA DE ENTREVISTA ESTUDIANTES DE PREGRADO FI
                </h1>
             </ul>
             
        </div>
        <div id= "icon">
            <i className="fa-receipt"></i>
        </div>
        </>
      )
}