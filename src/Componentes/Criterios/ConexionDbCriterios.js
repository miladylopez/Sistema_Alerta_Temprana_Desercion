const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1', // Cambia esto por la dirección del servidor de tu base de datos MariaDB
  user: 'root', // Cambia esto por el nombre de usuario de tu base de datos
  password: '123456789', // Cambia esto por la contraseña de tu base de datos
  database: 'alerta-temprana' // Cambia esto por el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida a la base de datos MariaDB');
});

// Función para obtener todos los criterios
function obtenerCriterios(callback) {
  connection.query('SELECT * FROM criterios', (error, results) => {
    if (error) {
      console.error('Error al obtener criterios:', error);
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

// Función para obtener todos los sub_criterios
function obtenerSubCriterios(callback) {
  connection.query('SELECT * FROM sub_criterios', (error, results) => {
    if (error) {
      console.error('Error al obtener sub_criterios:', error);
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

// Función para obtener todos los sub_criterios_aspirantes
function obtenerSubCriteriosAspirantes(callback) {
  connection.query('SELECT * FROM sub_criterio_aspirante', (error, results) => {
    if (error) {
      console.error('Error al obtener sub_criterios_aspirantes:', error);
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

// Ejemplo de uso de las funciones
obtenerCriterios((error, resultados) => {
  if (error) {
    console.error('Error al obtener criterios:', error);
    return;
  }
  console.log('Criterios obtenidos:', resultados);
});

obtenerSubCriterios((error, resultados) => {
  if (error) {
    console.error('Error al obtener sub_criterios:', error);
    return;
  }
  console.log('Sub_criterios obtenidos:', resultados);
});

obtenerSubCriteriosAspirantes((error, resultados) => {
  if (error) {
    console.error('Error al obtener sub_criterios_aspirantes:', error);
    return;
  }
  console.log('Sub_criterios_aspirantes obtenidos:', resultados);
});

module.exports = {
  obtenerCriterios,
  obtenerSubCriterios,
  obtenerSubCriteriosAspirantes
};
