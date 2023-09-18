import React, { useState } from 'react';

function Popup1() {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (

    <div>
      <button
        className="DetCrit"
        onClick={togglePopup}>
         Detalles
      </button>
      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            {/* Contenido del pop-up */}
            <p> 
                Tacto - Acertividad:
                - Manera de responder, uso adecuado de expresiones para demostrar su punto de vista. 
                Preguntas sugeridas:
                - ¿Cómo manejas los problemas o diferencias en un equipo de trabajo?.
                - ¿Si sabes que un profesor se equivocó en una calificación y él no lo reconoce o acepta, cómo harías para lograr la corrección?.</p>
            <p> Actividades e Intereses:
                Valorar entre otros aspectos: Uso del tiempo libre, participación en actividades de grupo, pasatiempos del estudiante.
                Preguntas sugeridas:
                - ¿Cómo organizas tu tiempo?.
                - ¿Cuál es tu pasatiempo favorito?.
                - ¿Te gusta hacer varias cosas a la vez?.
                - ¿Practicas algún deporte? ¿Qué tan importante es el deporte en tu vida diaria?.
                - ¿Te gusta la lectura? ¿Cuál fue el último libro que leíste? ¿Qué le aportó a tu vida personal y profesional el último libro que leíste?.</p>
            <p> Contexto Educativo:
                Valorar y conocer un poco más el contexto educativo del que proviene el candidato.
                Preguntas sugeridas:
                - ¿Cuál es tu rendimiento escolar?.
                - ¿Cómo es tu desempeño escolar en clases?.
                - ¿Cómo te fue en el ICFES y en qué áreas te fue mejor?.
                - ¿Cómo te va con las matemáticas y la resolución de problemas?.
                - ¿Te gusta resolver problemas?.
                - ¿En qué materias te iba mejor y cuáles no te gustaban?.
                - ¿El colegio en el que estudiaste tenía alguna media técnica o énfasis?.
                - ¿Qué fue lo que más te gustó de la materia de Informática?.
              </p>  
            <button onClick={togglePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup1;