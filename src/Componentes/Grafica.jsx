import React, { useState } from 'react';
import '../index.css';
import estudiante from '../Imagenes/estudiante.jpeg';
import grafico from '../Imagenes/Grafico.png';

function Grafica() {
    return (
        <div>
          <h1>Samuel Alejandro </h1>
          <h1>CC: 1005101080 </h1>
          <img
            src={estudiante}
            alt="Estudiante"
            className="estud"
            style={{ top: '50px', left: '50px' }} // Establece la posición de la imagen 1
          />
          <img
            src={grafico}
            alt="Grafico"
            className="graf"
            style={{ top: '500px', left: '500px' }} // Establece la posición de la imagen 2
          />
    </div>
  );
}

  export default Grafica;