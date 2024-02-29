import React, { useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill, BsPlusCircleFill, BsTrashFill, BsXCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../Criterios.css';

const Criterios_Evaluar = () => {
  const [criteriaScores, setCriteriaScores] = useState({});
  const [criterios, setCriterios] = useState([
    { titulo: "Presentacion Personal y Habilidades de Comunicación", id: "Crit1", ruta: "Presentacion" },
    { titulo: "Habilidades de Relaciones Personales y Contexto Educativo", id: "Crit2", ruta: "Habilidades" },
    { titulo: "Motivacion, Personalidad y Autoevaluación", id: "Crit3", ruta: "Personalidad" },
    { titulo: "Metas Personales y Visión", id: "Crit4", ruta: "Metas" }
  ]);
  const [newCriterioText, setNewCriterioText] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

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
    setShowModal(false); // Cierra el modal después de agregar el nuevo criterio
  };

  const handleForward = () => {
    // Lógica para avanzar
  };
  
  const handleBackward = () => {
    // Lógica para retroceder
  };
  

  return (
    <>
      <div>
        <ul id="titulo">
          <h1>FICHA DE ENTREVISTA ESTUDIANTES DE PREGRADO FI</h1>
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

        {criterios.map((criterio) => (
          <div key={criterio.id} className="criterio-container">
            <div className="criterio-box">
              <Link to={`/${criterio.ruta}`}>
                <button className="criterio-button">{criterio.titulo}</button>
              </Link>
              <input
                type="number"
                className="score-input"
                value={criteriaScores[criterio.id] || ""}
                onChange={(e) => handleScoreChange(criterio.id, e.target.value)}
              />
              <button
                className="delete-button"
                onClick={() => handleDeleteCriterio(criterio.id)}
              >
                <BsTrashFill />
              </button>
            </div>
          </div>
        ))}

        <div className="add-crit">
          {/* Botón para abrir el modal */}
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
            <button className='add' onClick={handleAddCriterio}>Agregar</button>
            <button className="close-button " onClick={() => setShowModal(false)}><BsXCircleFill /></button> {/* Botón para cerrar el modal */}
          </div>
        </div>
      )}
    </>
  );
}

export default Criterios_Evaluar;
