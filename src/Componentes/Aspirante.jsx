import React, { useState } from 'react';
import '../index.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Aspirante = () => {
  const navigate = useNavigate();
  const [aspirantes, setAspirantes] = useState([]);
  const [newAspiranteText, setNewAspiranteText] = useState('');
  const [newApellidoText, setNewApellidoText] = useState('');
  const [newCodigoText, setNewCodigoText] = useState('');
  const [editingAspiranteId, setEditingAspiranteId] = useState(null);
  const [editedAspiranteText, setEditedAspiranteText] = useState('');
  const [editedApellidoText, setEditedApellidoText] = useState('');
  const [editedCodigoText, setEditedCodigoText] = useState('');
  const [nextId, setNextId] = useState(1);

  const handleAddAspirante = () => {
    if (newAspiranteText.trim() === '' || newApellidoText.trim() === '' || newCodigoText.trim() === '') {
      return;
    }

    const newAspirante = {
      id: nextId,
      nombre: newAspiranteText,
      apellido: newApellidoText,
      codigo: newCodigoText
    };

    setNextId(prevId => prevId + 1);
    setAspirantes(prevAspirantes => [...prevAspirantes, newAspirante]);
    setNewAspiranteText('');
    setNewApellidoText('');
    setNewCodigoText('');
  };

  const handleDeleteAspirante = (aspiranteId) => {
    const updatedAspirantes = aspirantes.filter(aspirante => aspirante.id !== aspiranteId);
    setAspirantes(updatedAspirantes);
  };

  const handleEditAspirante = (aspiranteId) => {
    setEditingAspiranteId(aspiranteId);
    const aspiranteToEdit = aspirantes.find(aspirante => aspirante.id === aspiranteId);
    setEditedAspiranteText(aspiranteToEdit.nombre);
    setEditedApellidoText(aspiranteToEdit.apellido);
    setEditedCodigoText(aspiranteToEdit.codigo);
  };

  const handleSaveEdit = () => {
    const updatedAspirantes = aspirantes.map(aspirante => {
      if (aspirante.id === editingAspiranteId) {
        return {
          ...aspirante,
          nombre: editedAspiranteText,
          apellido: editedApellidoText,
          codigo: editedCodigoText
        };
      }
      return aspirante;
    });

    setAspirantes(updatedAspirantes);
    setEditingAspiranteId(null);
    setEditedAspiranteText('');
    setEditedApellidoText('');
    setEditedCodigoText('');
  };

  return (
    <div className="container">
      <header>
        <h1 className="title">Sistema de Alerta Temprana - Aspirantes</h1>
      </header>
      <main>
        <div className="add-criterio-container">
          <input
            type="text"
            className="new-criterio-input"
            placeholder="Nuevo aspirante"
            value={newAspiranteText}
            onChange={(e) => setNewAspiranteText(e.target.value)}
          />
          <input
            type="text"
            className="new-criterio-input"
            placeholder="Nuevo apellido"
            value={newApellidoText}
            onChange={(e) => setNewApellidoText(e.target.value)}
          />
          <input
            type="text"
            className="new-codigo-input"
            placeholder="Código"
            value={newCodigoText}
            onChange={(e) => setNewCodigoText(e.target.value)}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <button
            className="add-button"
            onClick={handleAddAspirante}
          >
            Agregar Aspirante
          </button>
        </div>

        {aspirantes.map((aspirante) => (
          <div key={aspirante.id} className="criterio-container">
            <div className="criterio-box">
              <div className="criterio-text-box">
                <p className="criterio-text">{aspirante.id} - {aspirante.nombre} {aspirante.apellido} - {aspirante.codigo}</p>
              </div>
              <button className="delete-button" onClick={() => handleDeleteAspirante(aspirante.id)}>Borrar</button>
              {editingAspiranteId === aspirante.id ? (
                <>
                  <input
                    type="text"
                    value={editedAspiranteText}
                    onChange={(e) => setEditedAspiranteText(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedApellidoText}
                    onChange={(e) => setEditedApellidoText(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedCodigoText}
                    onChange={(e) => setEditedCodigoText(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Guardar</button>
                </>
              ) : (
                <button className="edit-button" onClick={() => handleEditAspirante(aspirante.id)}>Editar</button>
              )}
              <button className="ingresar-button" onClick={() => navigate("/Ficha")}>Ingresar</button>

            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Aspirante;
