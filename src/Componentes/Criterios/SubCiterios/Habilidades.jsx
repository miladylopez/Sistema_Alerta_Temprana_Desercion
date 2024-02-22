import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importar la función uuidv4 para generar IDs únicos
import Actividades_Intereses from '../../Popup/Habilidades/Popup_Activiades_interes';
import Contexto_Educativo from '../../Popup/Habilidades/Popup_Contexto_educativo';
import Tacto_Acertividad from '../../Popup/Habilidades/Popup_Tacto_Acertividad';
import '../Criterios.css'; // Asegúrate de importar tu archivo CSS aquí

const Habilidades = () => {
  const [criteriaScores, setCriteriaScores] = useState({});
  const [criterios, setCriterios] = useState([
    { titulo: "Tacto - Asertividad", id: "Crit7" },
    { titulo: "Actividades e Intereses", id: "Crit8" },
    { titulo: "Contexto Educativo", id: "Crit9" }
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
          <h1>PRESENTACIÓN PERSONAL Y HABILIDADES DE COMUNICACIÓN</h1>
        </ul>
        <br />

        <ul id="subtitulo">
          <h2>
            <div id="Crit">
              <i className="fa-sharp fa-solid fa-list-check"></i>
            </div>
            CRITERIOS A EVALUAR
            <i className="fa-sharp fa-solid fa-percent"></i>
          </h2>
        </ul>
        <br />
        <div>
            <Tacto_Acertividad />
        </div>
        <div>
            <Actividades_Intereses/>
        </div>
        <div>
            <Contexto_Educativo/>
        </div>
        {/* Agregar nuevo criterio */}
        <div className="add-criterio-container">
          <input
            type="text"
            className="new-criterio-input"
            placeholder="Nuevo criterio"
            value={newCriterioText}
            onChange={(e) => setNewCriterioText(e.target.value)}
          />
          <button
            className="add-button"
            onClick={() => handleAddCriterio(newCriterioText)}
          >
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

export default Habilidades;