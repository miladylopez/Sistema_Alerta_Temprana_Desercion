import React, { useState } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill, BsPlusCircleFill, BsTrashFill } from "react-icons/bs";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import "../SubCriterios/SubCriterios.css";

const Personalidad = () => {
  const [criterios, setCriterios] = useState([
    {
      titulo: "Impresión de sí mismo",
      id: "SubCtrPr1",
      contenido: [
        "El concepto que tiene el candidato de sí mismo.",
        "Preguntas sugeridas:",
        "- ¿Cómo te describes como persona/estudiante/hijo? Se puede tomar alguna de estas categorías o todas si así se desea.",
        "- ¿Cuáles son tus mayores fortalezas y qué debilidades te gustaría mejorar?",
        "- ¿Qué palabra describe tu forma de ser?",
        "- ¿Te gusta resolver problemas?",
        "- Dos cualidades y Dos cosas por mejorar",
      ],
      puntajeMaximo: 3,
    },
    {
      titulo: "Valores, Opiniones Y Preferencias",
      id: "SubCtrPr2",
      contenido: [
        "Valores opiniones y preferencias del candidato.",
        "Preguntas sugeridas:",
        "- ¿Qué te parece más importante en la vida: la vida familiar, lograr algo en la vida, participar en la vida de comunidad, un trabajo interesante y lucrativo?, se puede optar por incluir otros tópicos.",
        "- ¿Qué opinas de la situación actual del país?",
        "- ¿Qué valores le aportó la educación recibida en el colegio?",
        "- ¿Qué es más importante, el conocimiento o los valores?",
      ],
      puntajeMaximo: 6,
    },
    {
      titulo: "Personalidad",
      id: "SubCtrPr3",
      contenido: [
        "Considerar la actitud de seguridad/inseguridad, credulidad/incredulidad del candidato al responder las diferentes cuestiones.",
        "Preguntas sugeridas:",
        "- ¿Cómo te describiría tu mejor amigo/tu mamá/papá/hermano(a)?",
        "- ¿Te consideras una persona con iniciativa?",
        "- ¿Te consideras una persona creativa?",
        "- ¿Qué has aprendido de tus errores?",
        "- ¿Qué opinión crees que sacaré una vez finalizada la entrevista?- Completa la siguiente frase: “En estos momentos me siento…”",
      ],
      puntajeMaximo: 6,
    },
  ]);

  const [criteriaScores, setCriteriaScores] = useState({});

  const handleDeleteCriterio = (criterioId) => {
    const updatedCriterios = criterios.filter(
      (criterio) => criterio.id !== criterioId
    );
    setCriterios(updatedCriterios);
    const updatedScores = { ...criteriaScores };
    delete updatedScores[criterioId];
    setCriteriaScores(updatedScores);
  };

  const handleEditCriterio = (criterioId) => {
    const criterio = criterios.find(c => c.id === criterioId);
    Swal.fire({
      title: criterio.titulo,
      html: `<textarea id="swal-input" class="edith-sub">${criterio.contenido.join('\n')}</textarea>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      preConfirm: () => {
        const editedContent = document.getElementById('swal-input').value.split('\n');
        setCriterios(prevCriterios => {
          return prevCriterios.map(c => {
            if (c.id === criterioId) {
              return {
                ...c,
                contenido: editedContent,
              };
            }
            return c;
          });
        });
      }
    });
  };

  const toggleModal = (criterioId) => {
    const criterio = criterios.find(c => c.id === criterioId);
    Swal.fire({
      title: criterio.titulo,
      html: criterio.contenido.map(item => `<p>${item}</p>`).join(''),
      showCancelButton: true,
      confirmButtonText: 'Editar',
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        handleEditCriterio(criterioId);
      }
    });
  };

  const handleForward = () => {
    guardarCriterios();
    // Lógica para avanzar
  };

  const handleBackward = () => {
    guardarCriterios();
    // Lógica para retroceder
  };

  const handleAddCriterio = () => {
    Swal.fire({
      title: 'Agregar nuevo criterio',
      html: `
        <input id="swal-input-titulo" class="swal2-input" placeholder="Título del criterio">
        <textarea id="swal-textarea" class="edith-sub-add" placeholder="Descripción del criterio"></textarea>
        <input type="number" id="swal-input-puntaje" class="swal2-input" placeholder="Puntaje máximo">
      `,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      focusConfirm: false,
      preConfirm: () => {
        const titulo = document.getElementById('swal-input-titulo').value;
        const descripcion = document.getElementById('swal-textarea').value;
        const puntajeMaximo = document.getElementById('swal-input-puntaje').value;
        if (!titulo || !descripcion || !puntajeMaximo) {
          Swal.showValidationMessage('¡Debes ingresar un título, una descripción y un puntaje máximo!');
        }
        return { titulo, descripcion, puntajeMaximo };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newCriterio = {
          titulo: result.value.titulo,
          id: result.value.titulo.replace(/\s+/g, '-'),
          contenido: [result.value.descripcion],
          puntajeMaximo: parseInt(result.value.puntajeMaximo),
        };
        setCriterios((prevCriterios) => [...prevCriterios, newCriterio]);
        Swal.fire('¡Criterio agregado!', '', 'success');
      }
    });
  };

  const guardarCriterios = () => {
    // Lógica para guardar criterios y valores asignados
    console.log('Criterios y valores guardados');
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

        {criterios.map((criterio, index) => (
          <div key={criterio.id}>
            <div className="criterio-box">
              <button
                className="criterio-button-presentacion"
                onClick={() => toggleModal(criterio.id)}
              >
                {criterio.titulo}
              </button>
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
                {[...Array(criterio.puntajeMaximo + 1).keys()].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              <button
                className="delete-button"
                onClick={() =>
                  handleDeleteCriterio(criterio.id)}
                  >
                    <BsTrashFill />
                  </button>
                </div>
              </div>
            ))}
    
            <div className="add-crit">
              <button className="add-button " onClick={handleAddCriterio}>
                <BsPlusCircleFill />
              </button>
              <button className="save-button" onClick={guardarCriterios}>
                Guardar
              </button>
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
        </>
      );
    };
    
    export default Personalidad;
    