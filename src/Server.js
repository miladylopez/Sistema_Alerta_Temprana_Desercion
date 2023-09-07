// server.js

const express = require('express');
const mariadb = require('mariadb');
const app = express();

// Configura el puerto en el que deseas que tu servidor escuche.
const port = process.env.PORT || 3000;

// Configura la conexión a tu base de datos MariaDB.
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'user_sistema',
  password: '123456789',
  database: 'Aspirante',
  connectionLimit: 5, // Puedes ajustar este límite según tus necesidades.
});

// Middleware para permitir el análisis de solicitudes JSON.
app.use(express.json());

// Ruta para obtener datos de la base de datos.
app.get('/api/obtener-datos', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM tu_tabla');
    conn.release();

    res.json(rows); // Enviar los datos como respuesta JSON.
  } catch (err) {
    console.error('Error al obtener datos:', err);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// Inicia el servidor en el puerto especificado.
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
