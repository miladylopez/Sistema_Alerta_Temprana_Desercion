// Importa el paquete mysql
const mysql = require('mysql');

// Crea una conexión con la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'SistemaAlerta',
  database: 'sistema_alerta_temprana'
});

// Conecta tu aplicación a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Ejemplo de consulta SQL
connection.query('SELECT * FROM aspirantes', (error, results, fields) => {
  if (error) {
    console.error('Error al ejecutar la consulta:', error);
    return;
  }
  console.log('Resultados de la consulta:', results);
});

// Cierra la conexión cuando hayas terminado
connection.end();
