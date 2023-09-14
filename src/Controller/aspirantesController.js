// aspirantesController.js

const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'user_sistema',
  password: '123456789',
  database: 'Aspirante',
  connectionLimit: 5,
});

// Función para obtener datos de la base de datos
async function obtenerDatos(req, res) {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM tu_tabla');
    conn.release();
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener datos:', err);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
}

module.exports = {
  obtenerDatos,
  // Otras funciones relacionadas con aspirantes
};
