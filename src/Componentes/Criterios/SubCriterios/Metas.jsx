import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importar la función uuidv4 para generar IDs únicos
import '../../../index.css'; // Asegúrate de importar tu archivo CSS aquí
import Congruencia_metas_objetivos from '../../Popup/Metas/Popup_Congruencia';
import Metas_Obetivos from '../../Popup/Metas/Popup_Metas_Objetivos';
import Planes_profesionales from '../../Popup/Metas/Popup_Planes_Profesionales';

const Metas = () => {
  const [criteriaScores, setCriteriaScores] = useState({});
  const [criterios, setCriterios] = useState([
    { titulo: "Metas/Objetivos", id: "Crit13" },
    { titulo: "Planes Profesionales", id: "Crit14" },
    { titulo: "Congruencia entre Metas y Objetivos", id: "Crit15" }
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
        <div>
            <Metas_Obetivos/>
        </div>
        <div>
            <Planes_profesionales/>
        </div>
        <div>
            <Congruencia_metas_objetivos />
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

export default Metas;