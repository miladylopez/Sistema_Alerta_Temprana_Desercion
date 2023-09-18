import React, { useState } from 'react';
function Popup2() {
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
        <div className="popup2">
          <div className="popup-content2">
            {/* Contenido del pop-up */}
            <p> 
                Impresión de si mismo:
                -El concepto que tiene el candidato de sí mismo. 
                Preguntas sugeridas:
                - ¿Cómo te describes como persona/estudiante/hijo? Se puede tomar alguna de estas categorías o todas si así se desea.
                - ¿Cuáles son tus mayores fortalezas y qué debilidades te gustaría mejorar?.
                - ¿Qué palabra describe tu forma de ser?.
                - Dos cualidades y Dos cosas por mejorar.</p>
            <p>  Valores, Opiniones Y Preeferencias:
                Valores opiniones y preferencias del candidato. 
                Preguntas sugeridas:
                - ¿Qué te parece más importante en la vida: la vida familiar, lograr algo en la vida, participar en la vida de comunidad, un trabajo interesante y lucrativo?, se puede optar por incluir otros tópicos.
                - ¿Qué opinas de la situación actual del país?.
                - ¿Qué valores le aportó la educación recibida en el colegio?.
                - ¿Qué es más importante, el conocimiento o los valores?.</p>
            <p> Personalidad:
                Considerar la actitud de seguridad/inseguridad, credulidad/incredulidad del candidato al responder las diferentes cuestiones. 
                Preguntas sugeridas:
                - ¿Cómo te describiría tu mejor amigo/tu mamá/papá/hermano(a)?.
                - ¿Te consideras una persona con iniciativa?.
                - ¿Te consideras una persona creativa?.
                - ¿Qué has aprendido de tus errores?.
                - ¿Qué opinión crees que sacaré una vez finalizada la entrevista?- Completa la siguiente frase: “En estos momentos me siento…”
              </p>  
            <button onClick={togglePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup2;