import React, { useState } from 'react';
import '../index.css'; // Asegúrate de importar tu archivo CSS aquí
import { v4 as uuidv4 } from 'uuid'; // Importar la función uuidv4 para generar IDs únicos
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom

export function Ficha() {
  const [criteriaScores, setCriteriaScores] = useState({});
  const [criterios, setCriterios] = useState([
    { titulo: "Presentacion Personal y Habilidades de Comunicación", id: "Crit1" },
    { titulo: "Habilidades de Relaciones Personales y Contexto Educativo", id: "Crit2" },
    { titulo: "Motivacion, Personalidad y Autoevaluación", id: "Crit3" },
    { titulo: "Metas Personales y Visión", id: "Crit4" }
  ]);
  const [newCriterioText, setNewCriterioText] = useState('');

  const handleScoreChange = (criterioId, score) => {
    setCriteriaScores(prevScores => ({ ...prevScores, [criterioId]: score }));
  };

  const handleDeleteCriterio = (criterioId) => {
    const updatedCriterios = criterios.filter(criterio => criterio.id !== criterioId);
    setCriterios(updatedCriterios);
  };

  const handleAddCriterio = () => {
    if (newCriterioText.trim() === '') {
      return;
    }

    const newCriterio = { titulo: newCriterioText, id: uuidv4() };
    setCriterios(prevCriterios => [...prevCriterios, newCriterio]);
    setNewCriterioText('');
  };

  const handleSaveScores = () => {
    console.log(criteriaScores);
  };

  return (
    <>
      <div>
        <ul id="titulo">
          <h1>FICHA DE ENTREVISTA ESTUDIANTES DE PREGRADO FI</h1>
        </ul>
        <br />

        <ul id="subtitulo">
          <h1>
            <div id="Crit">
              <i className="fa-sharp fa-solid fa-list-check"></i>
            </div>
            CRITERIOS A EVALUAR
            <i className="fa-sharp fa-solid fa-percent"></i>
          </h1>
        </ul>
        <br />

        {criterios.map((criterio) => (
          <div key={criterio.id} className="criterio-container">
            <div className="criterio-box">
              {/* Agregar la ruta correcta en el botón */}
              {criterio.titulo === "Presentacion Personal y Habilidades de Comunicación" && (
                <Link to="/Presentacion">
                  <button className="criterio-button">{criterio.titulo}</button>
                </Link>
              )}
              {criterio.titulo === "Habilidades de Relaciones Personales y Contexto Educativo" && (
                <Link to="/Habilidades">
                  <button className="criterio-button">{criterio.titulo}</button>
                </Link>
              )}
              {criterio.titulo === "Motivacion, Personalidad y Autoevaluación" && (
                <Link to="/Personalidad">
                  <button className="criterio-button">{criterio.titulo}</button>
                </Link>
              )}
              {criterio.titulo === "Metas Personales y Visión" && (
                <Link to="/Metas">
                  <button className="criterio-button">{criterio.titulo}</button>
                </Link>
              )}
              <input
                type="number"
                className="score-input"
                value={criteriaScores[criterio.id] || ''}
                onChange={(e) => handleScoreChange(criterio.id, e.target.value)}
              />
              <button className="delete-button" onClick={() => handleDeleteCriterio(criterio.id)}>Borrar</button>
            </div>
          </div>
        ))}

        {/* Agregar nuevo criterio */}
        <div className="add-criterio-container">
          <input
            type="text"
            className="new-criterio-input"
            placeholder="Nuevo criterio"
            value={newCriterioText}
            onChange={(e) => setNewCriterioText(e.target.value)}
          />
          <button className="add-button" onClick={handleAddCriterio}>
            Agregar Criterio
          </button>
        </div>
      </div>

      <div className="save-button-container">
        <button className="save-button" onClick={handleSaveScores}>Guardar</button>
      </div>
    </>
  );
}
