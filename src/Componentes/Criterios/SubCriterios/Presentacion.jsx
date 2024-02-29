import React, { useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill, BsPlusCircleFill, BsTrashFill, BsXCircleFill } from "react-icons/bs"; // Importar el icono de la canasta
import { v4 as uuidv4 } from 'uuid'; // Importar la función uuidv4 para generar IDs únicos
import '../SubCriterios/SubCriterios.css'; // Importar los estilos

const Presentacion = () => {
  const [criteriaScores, setCriteriaScores] = useState({});
  const [criterios, setCriterios] = useState([
    { titulo: "Aspecto Personal", id: "Crit5" },
    { titulo: "Comunicacion Oral", id: "Crit6" }
  ]);

  // Estados para controlar la visibilidad de los modales
  const [showAspectoPersonalModal, setShowAspectoPersonalModal] = useState(false);
  const [showComunicacionOralModal, setShowComunicacionOralModal] = useState(false);
  
  // Estado para controlar la visibilidad del modal de agregar nuevo criterio
  const [showModal, setShowModal] = useState(false);

  // Estado para controlar el texto del nuevo criterio
  const [newCriterioText, setNewCriterioText] = useState('');

  const handleScoreChange = (criterioId, score) => {
    setCriteriaScores(prevScores => ({ ...prevScores, [criterioId]: score }));
  };

  const handleDeleteCriterio = (criterioId) => {
    const updatedCriterios = criterios.filter(criterio => criterio.id !== criterioId);
    setCriterios(updatedCriterios);
  };

  const handleAddCriterio = (text) => {
    const newCriterio = { titulo: text, id: uuidv4() };
    setCriterios(prevCriterios => [...prevCriterios, newCriterio]);
    setNewCriterioText('');
  };

  const handleSaveScores = () => {
    console.log(criteriaScores);
  };

  // Funciones para mostrar/ocultar los modales
  const toggleAspectoPersonalModal = () => {
    setShowAspectoPersonalModal(prevState => !prevState);
  };

  const toggleComunicacionOralModal = () => {
    setShowComunicacionOralModal(prevState => !prevState);
  };
  
  // Funciones para avanzar y retroceder
  const handleForward = () => {
    // Lógica para avanzar
  };

  const handleBackward = () => {
    // Lógica para retroceder
  };

  return (
    <>
      <div>
        <ul id="tituloPresentacion">
          <h1>PRESENTACIÓN PERSONAL Y HABILIDADES DE COMUNICACIÓN</h1>
        </ul>
        <br />

        <ul id="subtituloPresentacion">
          <h2>
            <div id="Crit">
              <i className="fa-sharp fa-solid fa-list-check"></i>
            </div>
            CRITERIOS A EVALUAR
            <i className="fa-sharp fa-solid fa-percent"></i>
          </h2>
        </ul>
        <br />

        {/* Renderizar los criterios y sus respectivos modales */}
        {criterios.map((criterio) => (
          <div key={criterio.id}>
            <div className="criterio-box">
              <button className='criterio-button-presentacion' onClick={criterio.id === "Crit5" ? toggleAspectoPersonalModal : toggleComunicacionOralModal}>
                {criterio.titulo}
              </button>
              {/* Input numérico */}
              <input
                type="number"
                className="score-input"
                value={criteriaScores[criterio.id] || ''}
                onChange={(e) => handleScoreChange(criterio.id, e.target.value)}
              />
              {/* Botón para borrar con icono de la canasta */}
              <button className="delete-button" onClick={() => handleDeleteCriterio(criterio.id)}>
                <BsTrashFill />
              </button>
            </div>
          </div>
        ))}

        {/* Modal para el subcriterio "Aspecto Personal" */}
        {showAspectoPersonalModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Información sobre Aspecto Personal</h2>
              {/* Contenido específico de Aspecto Personal */}
              <button onClick={toggleAspectoPersonalModal}>Cerrar</button>
            </div>
          </div>
        )}

        {/* Modal para el subcriterio "Comunicacion Oral" */}
        {showComunicacionOralModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Información sobre Comunicación Oral</h2>
              {/* Contenido específico de Comunicacion Oral */}
              <button onClick={toggleComunicacionOralModal}>Cerrar</button>
            </div>
          </div>
        )}

        <div className="add-crit">
          {/* Botón para abrir el modal de agregar nuevo criterio */}
          <button className="add-button " onClick={() => setShowModal(true)}>
            <BsPlusCircleFill />
          </button>

          {/* Contenedor para los botones de adelante y atrás */}
          <div className="navigation-buttons">
            <button className="forward-button" onClick={handleForward}>
              <BsArrowLeftSquareFill />
            </button>
            <button className="backward-button" onClick={handleBackward}>
              <BsArrowRightSquareFill />
            </button>
          </div>
        </div>
      </div>

      {/* Modal para agregar un nuevo criterio */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <input className='tex'
              type="text"
              placeholder="Nuevo criterio"
              value={newCriterioText}
              onChange={(e) => setNewCriterioText(e.target.value)}
            />
            <button className='add' onClick={() => handleAddCriterio(newCriterioText)}>Agregar</button>
            <button className="close-button " onClick={() => setShowModal(false)}><BsXCircleFill /></button> {/* Botón para cerrar el modal */}
          </div>
        </div>
      )}
    </>
  );
}

export default Presentacion;
