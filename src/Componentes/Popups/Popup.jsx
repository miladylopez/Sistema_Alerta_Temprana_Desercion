import React, { useState } from 'react';

function Popup() {
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
        <div className="popup">
          <div className="popup-content">
            {/* Contenido del pop-up */}
            <p> Aspecto Personal:
            - Impacto general que genera el estudiante (agradable, confianza, seguridad, etc).
            - Forma de vestir (adecuada, llamativa, etc).</p>
            <p> Comunicación Oral:
            - Claridad, seguridad, lógica, riqueza de vocabulario. 
              La comunicación oral se evalúa en la medida que se va desarrollando la entrevista con 
              las preguntas que se realicen al estudiante. Valorar entre otros aspectos:
            - Contacto visual.
            - Postura.
            - Gesticulación.
            - Tono, timbre, volumen.</p>
            <button onClick={togglePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;