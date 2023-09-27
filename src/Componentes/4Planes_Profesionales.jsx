import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Subcriterio10() {

  const [criteriaScores, setCriteriaScores] = useState({});
  const [criterios, setCriterios] = useState([
    { titulo: "Planes Profesionales", id: "Crit14" },
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
                    <h1>Metas/ Objetivos</h1>
                    <p> Valorar la claridad, realismo y lógica de las metas del candidato.  </p>
                    <p> Preguntas sugeridas:</p>
                    <p> - ¿Por qué decidiste estudiar esta carrera?</p>
                    <p> - ¿Has pensado estudiar en otra Universidad?</p>
                    <p> - ¿Por qué la UNAC?</p>
                    <p> - ¿Tiene alguna beca?</p>
                    <p> - ¿Eres consciente de los principios y valores de la UNAC?</p>
                    <p> - ¿Qué esperas lograr con una profesión como esta?</p>
                    <p> - ¿Qué ambicionas/deseas en estos momentos?</p>
                    <p> - ¿Qué tipo de puesto te gustaría desempeñar en unos 7 ó 10 años a partir de esta fecha?</p>
                    <p> - ¿Te ves en el extranjero?</p>
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

export default Subcriterio10;