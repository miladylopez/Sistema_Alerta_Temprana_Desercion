import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importar la función uuidv4 para generar IDs únicos
import '../../../index.css'; // Asegúrate de importar tu archivo CSS aquí
import Impresion_de_si_mismo from '../../Popup/Personalidad/Popup_Impresion_de_si_Mismo';
import Personalidad3 from '../../Popup/Personalidad/Popup_Personalidad';
import Valores_Opiniones_Diferencias from '../../Popup/Personalidad/Popup_Valores';


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
          <h1>PRESENTACIÓN PERSONAL Y HABILIDADES DE COMUNICACIÓN</h1>
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
        <div>
            <Impresion_de_si_mismo />
        </div>
        <div>
            <Valores_Opiniones_Diferencias/>
        </div>
        <div>
            <Personalidad3/>
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

export default Personalidad;