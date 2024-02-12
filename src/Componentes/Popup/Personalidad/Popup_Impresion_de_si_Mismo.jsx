import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Subcriterio6() {

  const [criteriaScores, setCriteriaScores] = useState({});
  const [criterios, setCriterios] = useState([
    { titulo: "Impresion de si Mismo", id: "Crit10" },
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
                    <h1>Impresión de si mismo</h1>
                    <p> El concepto que tiene el candidato de sí mismo.</p>
                    <p> Preguntas sugeridas:</p>
                    <p> - ¿Cómo te describes como persona/estudiante/hijo? Se puede tomar alguna de estas categorías o todas si así se desea.</p>
                    <p> - ¿Cuáles son tus mayores fortalezas y qué debilidades te gustaría mejorar?</p>
                    <p> - ¿Qué palabra describe tu forma de ser?</p>
                    <p> - ¿Te gusta resolver problemas?</p>
                    <p> - Dos cualidades y Dos cosas por mejorar</p>
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

export default Subcriterio6;
