// server.js

const express = require('express');
const mariadb = require('mariadb');
const app = express();

// Configura el puerto en el que deseas que tu servidor escuche.
const port = process.env.PORT || 3000;

// Configura la conexión a tu base de datos MariaDB.
const pool = mariadb.createPool({
  host: 'tu_host_de_MariaDB',
  user: 'tu_usuario_de_MariaDB',
  password: 'tu_contraseña_de_MariaDB',
  database: 'tu_base_de_datos',
  connectionLimit: 5, // Puedes ajustar este límite según tus necesidades.
});

// Middleware para permitir el análisis de solicitudes JSON.
app.use(express.json());

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

// Inicia el servidor en el puerto especificado.
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
