import React from 'react';
import '../Inicio/Inicio.css';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="container">
      <h1 className="titulo">SAT - SISTEMA DE ALERTA TEMPRANA</h1>
      <p className="texto">
        Prototipo de Sistema de Alerta Temprana creado para generar una alerta al coordinador de si algún 
      </p>
      <p className="texto"> 
        estudiante está en riesgo de desertar de los programas de Ingeniería.
      </p>
      <div className="botones">
        <Link to="/Aspirante" className="boton">Añadir Aspirante</Link>
        <Link to="/VerAspirante" className="boton">Ver Aspirante</Link>
      </div>
    </div>
  );
}

export default Inicio;