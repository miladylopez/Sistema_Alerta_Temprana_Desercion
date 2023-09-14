const express = require('express');
const router = express.Router();
const aspirantesController = require('../Componentes/aspirantesController'); // Asegúrate de que la ruta del controlador sea correcta

// Definir rutas y asociarlas con funciones del controlador
router.get('/', aspirantesController.getAllAspirantes); // Obtener todos los aspirantes
router.post('/', aspirantesController.addAspirante); // Agregar un nuevo aspirante
// Puedes definir más rutas y asociaciones según tus necesidades

module.exports = router;
