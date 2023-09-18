import React, { useState } from 'react';
import '../index.css'; // Asegúrate de importar tu archivo CSS aquí
import { v4 as uuidv4 } from 'uuid'; // Importar la función uuidv4 para generar IDs únicos
import Popup2 from './Popups/Popup2';


const Personalidad = () => {
  const [criteriaScores, setCriteriaScores] = useState({});
  const [criterios, setCriterios] = useState([
    { titulo: "Impresion de si Mismo", id: "Crit10" },
    { titulo: "Valores, Opiniones y Preferencias", id: "Crit11" },
    { titulo: "Personalidad", id: "Crit12" }
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
          <h1>MOTIVACION, PERSONALIDAD Y AUTOVALORACIÓN</h1>
        </ul>
        <div id="texto">
          <p>Capacidad del candidato para mostrar interés y compromiso con su decisión profesional</p>
        </div>
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
              <div className="criterio-text-box">
                <p className="criterio-text">{criterio.titulo}</p>
              </div>
              <div>
                <Popup2 />
              </div>
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

export default Personalidad;