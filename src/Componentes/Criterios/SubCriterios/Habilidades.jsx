import React, { useState } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill, BsPlusCircleFill, BsTrashFill } from "react-icons/bs";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import "../SubCriterios/SubCriterios.css";

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
      puntajeMaximo: 3,
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
      puntajeMaximo: 6,
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
    
    export default Habilidades;
    