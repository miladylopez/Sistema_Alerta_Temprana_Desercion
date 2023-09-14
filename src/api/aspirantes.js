// api/aspirantes.js

const express = require('express');
const router = express.Router();

// Datos de ejemplo (puedes reemplazarlos con tu base de datos)
const aspirantes = [
  { id: 1, nombre: 'Juan', edad: 25 },
  { id: 2, nombre: 'María', edad: 22 },
  // Otros aspirantes...
];

// Ruta para obtener todos los aspirantes
router.get('/aspirantes', (req, res) => {
  res.json(aspirantes);
});

// Ruta para agregar un nuevo aspirante
router.post('/aspirantes', (req, res) => {
  const nuevoAspirante = req.body; // Debe contener los datos del nuevo aspirante
  aspirantes.push(nuevoAspirante);
  res.json({ message: 'Aspirante agregado correctamente' });
});

module.exports = router;
