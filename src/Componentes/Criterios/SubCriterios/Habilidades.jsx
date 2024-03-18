import React, { useState } from "react";
import {
  BsArrowLeftSquareFill,
  BsArrowRightSquareFill,
  BsPlusCircleFill,
  BsTrashFill,
  BsXCircleFill,
} from "react-icons/bs"; // Importar el icono de la canasta
import "../SubCriterios/SubCriterios.css"; // Importar los estilos

const Habilidades = () => {
  const [criterios, setCriterios] = useState([
    {
      titulo: "Actividades e Intereses",
      id: "SubCtrHb1",
      contenido: [
        "Valorar entre otros aspectos: Uso del tiempo libre, participación en actividades de grupo, pasatiempos del estudiante.",
        "Preguntas sugeridas:",
        "- ¿Cómo organizas tu tiempo?",
        "- ¿Cuál es tu pasatiempo favorito?",
        "- ¿Te gusta hacer varias cosas a la vez?",
        "- ¿Practicas algún deporte? ¿Qué tan importante es el deporte en tu vida diaria?",
        "- ¿Te gusta la lectura? ¿Cuál fue el último libro que leíste? ¿Qué le aportó a tu vida personal y profesional el último libro que leíste?",
      ],
    },
    {
      titulo: "Contexto Educativo",
      id: "SubCtrHb2",
      contenido: [
        "Valorar y conocer un poco más el contexto educativo del que proviene el candidato.",
        "Preguntas sugeridas:",
        "- ¿Cuál es tu rendimiento escolar?.",
        "- ¿Cómo es tu desempeño escolar en clases?",
        "- ¿Cómo te fue en el ICFES y en qué áreas te fue mejor?",
        "- ¿Cómo te va con las matemáticas y la resolución de problemas?",
        "- ¿Te gusta resolver problemas?",
        "- ¿En qué materias te iba mejor y cuáles no te gustaban?",
        "- ¿El colegio en el que estudiaste tenía alguna media técnica o énfasis?",
        "- ¿Qué fue lo que más te gustó de la materia de Informática?",
      ],
    },
    {
      titulo: "Tacto - Acertividad",
      id: "SubCtrHb3",
      contenido: [
        "Manera de responder, uso adecuado de expresiones para demostrar su punto de vista.",
        "Preguntas sugeridas:",
        "- ¿Cómo manejas los problemas o diferencias en un equipo de trabajo?",
        "- ¿Si sabes que un profesor se equivocó en una calificación y él no lo reconoce o acepta, cómo harías para lograr la corrección?",
      ],
    },
  ]);

  // Estados para controlar la visibilidad de los modales
  const [showAspectoPersonalModal, setShowAspectoPersonalModal] =
    useState(false);
  const [showComunicacionOralModal, setShowComunicacionOralModal] =
    useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el visibilidad del modal de agregar nuevo criterio
  const [newCriterioText, setNewCriterioText] = useState(""); // Estado para controlar el texto del nuevo criterio
  const [editMode, setEditMode] = useState(false); // Estado para controlar si el contenido del modal está en modo de edición o no
  const [editIndex, setEditIndex] = useState(null);
  const [editedContent, setEditedContent] = useState(""); // Estado para almacenar los valores seleccionados para cada criterio
  const [criteriaDropdownRange, setCriteriaDropdownRange] = useState(5);
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
    setShowModal(false); // Cerrar el modal de agregar después de agregar el criterio
  };

  // Funciones para mostrar/ocultar los modales
  const toggleModal = (criterioId) => {
    if (criterioId === "SubCtrHb1") {
      setShowAspectoPersonalModal((prevState) => !prevState);
      setShowComunicacionOralModal(false); // Asegúrate de ocultar el otro modal si es necesario
    } else if (criterioId === "SubCtrHb2") {
      setShowAspectoPersonalModal(false); // Asegúrate de ocultar el otro modal si es necesario
      setShowComunicacionOralModal((prevState) => !prevState);
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
        {criterios.map((criterio, index) => (
          <div key={criterio.id}>
            {showAspectoPersonalModal && criterio.id === "SubCtrHb1" && (
              <div className="modal-sub">
                <div className="modal-content-sub">
                  <i className="fa-solid fa-list"></i>
                  <h1>Para tener en cuenta</h1>
                  <h2>{criterio.titulo}</h2>
                  {editMode && editIndex === index ? (
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
                  {editMode && editIndex === index ? (
                    <button className="btn-sub" onClick={handleEdit}>Guardar</button>
                  ) : (
                    <button className="btn-sub" onClick={() => toggleEditMode(index)}>
                      Editar
                    </button>
                  )}
                </div>
              </div>
            )}

            {showComunicacionOralModal && criterio.id === "SubCtrHb2" && (
              <div className="modal-sub">
                <div className="modal-content-sub">
                  <i className="fa-solid fa-list"></i>
                  <h1>Para tener en cuenta</h1>
                  <h2>{criterio.titulo}</h2>
                  {editMode && editIndex === index ? (
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
                  {editMode && editIndex === index ? (
                    <button className="btn-sub" onClick={handleEdit}>Guardar</button>
                  ) : (
                    <button className="btn-sub" onClick={() => toggleEditMode(index)}>
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
              onClick={() => setShowModal(false)}
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

export default Habilidades;
