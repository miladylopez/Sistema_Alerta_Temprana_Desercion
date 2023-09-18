import React, { useState } from 'react';
function Popup3() {
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
        <div className="popup3">
          <div className="popup-content3">
            {/* Contenido del pop-up */}
            <p> Metas/ Objetivos:
            Valorar la claridad, realismo y lógica de las metas del candidato. 
            Preguntas sugeridas: 
            - ¿Por qué decidiste estudiar esta carrera?
            - ¿Has pensado estudiar en otra Universidad?.
            - ¿Por qué la UNAC?.
            - ¿Tiene alguna beca?.
            - ¿Eres consciente de los principios y valores de la UNAC?.
            - ¿Qué esperas lograr con una profesión como esta?.
            - ¿Qué ambicionas/deseas en estos momentos?.
            - ¿Qué tipo de puesto te gustaría desempeñar en unos 7 ó 10 años a partir de esta fecha?.
            - ¿Te ves en el extranjero?.</p>
            <p>  Planes Profesionales
            Conocer los planes profesionales del candidato. 
            Preguntas sugeridas: 
                - ¿Qué te gustaría hacer una vez termines tu carrera?.
                - ¿En qué área de trabajo te gustaría especializarte?.
                - ¿Conoces cuál es la situación laboral de los profesionales de esta rama en la actualidad?.
                - ¿Renunciarías a tu vida personal o familiar a cambio de una brillante carrera profesional?, si es necesario solicitar al examinado que justifique su elección.</p>
            <p> Congruencia Entre Metas y Objetivos
                Se valora el nivel de equilibrio, claridad y realismo del candidato en los dos últimos puntos valorados en la entrevista.
            </p>
            <button onClick={togglePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup3;