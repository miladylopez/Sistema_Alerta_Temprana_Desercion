import React from 'react';
import '../Inicio/Inicio.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Inicio = () => {
  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header" >
          SAT 
        </div>
        <div className="card-body">
          <h5 className="card-title">SISTEMA DE ALERTA TEMPRANA</h5>
          <br />
          <p className="card-text">Prototipo de Sistema de Alerta Temprana creado para generar una alerta al coordinador en caso de que un </p>
          <p className="card-text">estudiante esté en riesgo de desertar de los programas de Ingeniería.</p>
          <br />
          <a href="/Aspirante" className="btn btn-primary btn-separator" role="button" data-bs-toggle="button">Añadir Aspirante</a>
          <a href="/VerAspirante" className="btn btn-primary" role="button" data-bs-toggle="button">Ver Aspirante</a>
        </div>
      </div>
    </div> 
  );
}

export default Inicio;