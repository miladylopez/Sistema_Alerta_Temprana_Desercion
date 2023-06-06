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
            <br></br>
            <ul id= "subtitulo">          
                <h1>
                  <i class="fa-sharp fa-light fa-clipboard-list-check"></i>
                   CRITERIOS A EVALUAR
                  <i class="fa-sharp fa-solid fa-percent"></i>
                </h1>       
            </ul>  
            <br></br>
            <br></br>
            <button className="Crit1">
                Presentacion Personal y Habilidades de Comunicación
                <div id = "Delete">
              <i className="fa-regular fa-trash-can"></i>
            </div>
              </button>     
              <br></br>
            <button className="Crit2">
                Habilidades de Relaciones Personales y Contexto Educativo
                <div id = "Delete">
              <i className="fa-regular fa-trash-can"></i>
            </div> 
              </button>
              <br></br>
            <button className="Crit3">
                Motivacion, Personalidad y Autoevaluación
                <div id = "Delete">
              <i className="fa-regular fa-trash-can"></i>
            </div> 
              </button>
              <br></br>
            <button className="Crit4">
                Metas Personales y Visión
                <div id = "Delete">
              <i className="fa-regular fa-trash-can"></i>
            </div> 
              </button>
        </div>
        </>
      )
}