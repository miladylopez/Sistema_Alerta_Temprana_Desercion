import React, { useState } from "react";
import {
  BsArrowLeftSquareFill,
  BsArrowRightSquareFill,
  BsPlusCircleFill,
  BsTrashFill,
  BsXCircleFill,
} from "react-icons/bs"; // Importar el icono de la canasta
import "../SubCriterios/SubCriterios.css"; // Importar los estilos

const InformacionBasica = () => {
  const [criterios, setCriterios] = useState([
    {
      titulo: "Estrato",
      id: "SubCtrIb1",
      contenido: [
        "- Descripción",
        "- Descripción",
      ],
    },
    {
      titulo: "Estado civil",
      id: "SubCtrIb2",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo: "Departamento",
      id: "SubCtrIb3",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo: "Municipio",
      id: "SubCtrIb4",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo: "Dirección",
      id: "SubCtrIb5",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo:
        "Grupo especial de proteccion constitucional (Grupo etnico, victima conflicto armado, discapacidad, madre cabeza de hogar)",
      id: "SubCtrIb6",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo: "Necesidad educativa",
      id: "SubCtrIb7",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo: "Validó bachillerato",
      id: "SubCtrIb8",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo: "Discapacidad",
      id: "SubCtrIb9",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo: "N personas a cargo",
      id: "SubCtrIb10",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo: "EPS",
      id: "SubCtrIb11",
      contenido: ["- Descripción", "- Descripción"],
    },
    {
      titulo: "Trabaja en ese periodo - Tipo trabajo",
      id: "SubCtrIb12",
      contenido: ["- Descripción", "- Descripción"],
    },
  ]);

  // Estado para controlar el id del modal abierto
  const [showModalId, setShowModalId] = useState(null);

  // Estados para controlar el texto del nuevo criterio
  const [newCriterioText, setNewCriterioText] = useState("");

  // Estado para controlar si el contenido del modal está en modo de edición o no
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  // Estado para controlar el rango del dropdown
  const [criteriaDropdownRange, setCriteriaDropdownRange] = useState(5);

  // Estado para almacenar los valores seleccionados para cada criterio
  const [criteriaScores, setCriteriaScores] = useState({});

  const handleDeleteCriterio = (criterioId) => {
    const updatedCriterios = criterios.filter(
      (criterio) => criterio.id !== criterioId
    );
    setCriterios(updatedCriterios);
    // Eliminar el valor seleccionado para el criterio eliminado
    const updatedScores = { ...criteriaScores };
    delete updatedScores[criterioId];
    setCriteriaScores(updatedScores);
  };

  const handleAddCriterio = (text) => {
    const newCriterio = {
      titulo: text,
      id: text.replace(/\s+/g, "-"),
      contenido: [],
    };
    setCriterios((prevCriterios) => [...prevCriterios, newCriterio]);
    // Asignar el rango del dropdown solo si es un valor nuevo
    if (!criteriaScores[newCriterio.id]) {
      setCriteriaScores((prevScores) => ({
        ...prevScores,
        [newCriterio.id]: 0,
      }));
    }
    setNewCriterioText("");
    setShowModalId(null); // Cerrar el modal de agregar después de agregar el criterio
  };

  // Función para mostrar/ocultar los modales
  const toggleModal = (criterioId) => {
    if (showModalId === criterioId) {
      setShowModalId(null);
    } else {
      setShowModalId(criterioId);
    }
    console.log("Modal abierto para el criterio:", criterioId);
  };

  // Función para cambiar el modo de edición
  const toggleEditMode = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setEditedContent(criterios[index].contenido.join("\n"));
  };

  const handleEdit = () => {
    const updatedCriterios = [...criterios];
    updatedCriterios[editIndex].contenido = editedContent.split("\n");
    setCriterios(updatedCriterios);
    setEditMode(false);
    setEditIndex(null);
    setEditedContent("");
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
          <h1>INFORMACIÓN BÁSICA</h1>
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
        {criterios.map((criterio, index) => (
          <div key={criterio.id}>
            <div className="criterio-box">
              <button
                className="criterio-button-presentacion"
                onClick={() => toggleModal(criterio.id)}
              >
                {criterio.titulo}
              </button>
              {/* Dropdown para seleccionar puntaje */}
              <select
                className="score-dropdown"
                value={criteriaScores[criterio.id] || 0}
                onChange={(e) =>
                  setCriteriaScores({
                    ...criteriaScores,
                    [criterio.id]: e.target.value,
                  })
                }
              >
                {[...Array(criteriaDropdownRange + 1).keys()].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              {/* Botón para borrar con icono de la canasta */}
              <button
                className="delete-button"
                onClick={() => handleDeleteCriterio(criterio.id)}
              >
                <BsTrashFill />
              </button>
              {/* Botón para editar */}
            </div>
          </div>
        ))}

        {/* Modales para los criterios */}
        {criterios.map((criterio) => (
          <div key={criterio.id}>
            {showModalId === criterio.id && (
              <div className="modal-sub">
                <div className="modal-content-sub">
                  <i className="fa-solid fa-list"></i>
                  <h1>Para tener en cuenta</h1>
                  <h2>{criterio.titulo}</h2>
                  {editMode ? (
                    <textarea
                      className="edith-sub"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    ></textarea>
                  ) : (
                    criterio.contenido.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))
                  )}
                  {/* Botones para cerrar y editar/guardar */}
                  <button className="btn-sub" onClick={() => toggleModal(criterio.id)}>
                    Cerrar
                  </button>
                  {editMode ? (
                    <button className="btn-sub" onClick={handleEdit}>Guardar</button>
                  ) : (
                    <button className="btn-sub" onClick={() => toggleEditMode(criterio.id)}>
                      Editar
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="add-crit">
          {/* Botón para abrir el modal de agregar nuevo criterio */}
          <button className="add-button " onClick={() => setShowModalId("NuevoCriterio")}>
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
      {showModalId === "NuevoCriterio" && (
        <div className="modal">
          <div className="modal-content">
            <input
              className="tex"
              type="text"
              placeholder="Nuevo criterio"
              value={newCriterioText}
              onChange={(e) => setNewCriterioText(e.target.value)}
            />
            {/* Input para definir el rango del dropdown */}
            <input
              type="number"
              className="dropdown-range-input"
              placeholder="Rango del dropdown"
              value={criteriaDropdownRange}
              onChange={(e) => setCriteriaDropdownRange(e.target.value)}
              min="0"
              step="1"
            />
            <button
              className="add"
              onClick={() => handleAddCriterio(newCriterioText)}
            >
              Agregar
            </button>
            <button
              className="close-button "
              onClick={() => setShowModalId(null)}
            >
              <BsXCircleFill />
            </button>{" "}
            {/* Botón para cerrar el modal */}
          </div>
        </div>
      )}
    </>
  );
};

export default InformacionBasica;
