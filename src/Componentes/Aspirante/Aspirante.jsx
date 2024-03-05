import React, { useState } from 'react';
import '../Aspirante/Aspirante.css';

function AgregarAspirante() {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del aspirante al servidor
    console.log('Nombre:', nombre);
    console.log('Código:', codigo);
    // Lógica para enviar los datos al servidor
  };

  return (
    <div>
      <h2>Agregar Aspirante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Código:</label>
          <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        </div>
        <button type="submit">Agregar Aspirante</button>
      </form>
    </div>
  );
}

export default AgregarAspirante;