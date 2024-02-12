import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Subcriterio1() {

  const [criteriaScores, setCriteriaScores] = useState({});
  const [criterios, setCriterios] = useState([
    { titulo: "Aspecto Personal", id: "Crit5" },
  ]);

  const [newCriterioText, setNewCriterioText] = useState('');

  const handleScoreChange = (criterioId, score) => {
    setCriteriaScores(prevScores => ({ ...prevScores, [criterioId]: score }));
  };

  const handleDeleteCriterio = (criterioId) => {
    // Lógica para eliminar el criterio con el id proporcionado
    // Actualizar el estado 'criterios' después de eliminar
    const updatedCriterios = criterios.filter(criterio => criterio.id !== criterioId);
    setCriterios(updatedCriterios);
  };

  const handleAddCriterio = (text) => {
    // Lógica para agregar un nuevo criterio
    // Aquí puedes generar un ID único para el nuevo criterio
    const newCriterio = { titulo: text, id: uuidv4() };
    setCriterios(prevCriterios => [...prevCriterios, newCriterio]);
    setNewCriterioText(''); // Limpiar el campo de entrada después de agregar
  };

  const handleSaveScores = () => {
    // Lógica para guardar los valores numéricos ingresados en la base de datos o donde sea necesario
    console.log(criteriaScores);
  };

  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
      <div>
        {/* Mostrar los criterios con campos de entrada numérica */}
         {criterios.map((criterio) => (
          <div key={criterio.id} >
            <div className="criterio-box">
              <div className="criterio-text-box">
                <button onClick={togglePopup} > {criterio.titulo}</button>
                {showPopup &&(
                <div className="popup">
                  <div className="popup-contenido">
                    <h2>Para tener en cuenta:</h2>
                    <h1>Aspecto Personal</h1>                   
                    <p> - Impacto general que genera el estudiante (agradable, confianza, seguridad, etc).</p>
                    <p> - Forma de vestir (adecuada, llamativa, etc).</p>
                   <  button className="boton-cerrar" onClick={togglePopup}>Cerrar</button>
                 </div>
                </div>
                )}
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
      </div>
  );
}

export default Subcriterio1;
