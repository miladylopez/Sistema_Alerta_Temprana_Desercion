const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

app.use(cors());
app.use(express.json());


// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root-SAT",
//   password: "SistemaAlerta12345!",
//   database: "sistema_alerta_temprana"
// });


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '34#Q$[30X^lT',
  database: 'sistema_alerta_temprana'
});


app.post("/createUser", (req, res) => {
  const { nombre_entrevistador, email_entrevistador, contraseña, telefono_entrevistador } = req.body;
  
  console.log("Datos recibidos:", req.body);

  connection.query(
    'INSERT INTO entrevistador(nombre_entrevistador, email_entrevistador, contraseña, telefono_entrevistador) VALUES (?, ?, ?, ?)',
    [nombre_entrevistador, email_entrevistador, contraseña, telefono_entrevistador],
    (err, result) => {
      
      if (err) {
        console.log("Error al insertar en la base de datos:", err);
        res.status(500).send("Error al registrar el usuario.");
      } else {
        res.send(result);
      }
    }
  );
});


app.post("/create", (req, res) => {
  const nombre_aspirante = req.body.nombre_aspirante;
  const codigo_carnet = req.body.codigo_carnet;
  const email_aspirante = req.body.email_aspirante;
  const telefono_aspirante = req.body.telefono_aspirante;
  const id_periodo = req.body.id_periodo;
  const id_entrevistador = req.body.id_entrevistador;
  const id_programa = req.body.id_programa;

  connection.query('INSERT INTO aspirantes(nombre_aspirante, codigo_carnet, email_aspirante, telefono_aspirante, id_periodo,id_entrevistador, id_programa ) VALUES (?, ?, ?, ?, ?, ?, ?)',
  [nombre_aspirante, codigo_carnet, email_aspirante, telefono_aspirante, id_periodo,id_entrevistador,id_programa], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/aspirantes", (req, res) => {
  connection.query('SELECT aspirantes.*, nombre_entrevistador, periodos.año, periodos.semestre, programa.nombre_programa  FROM aspirantes INNER JOIN entrevistador ON aspirantes.id_entrevistador = entrevistador.id_entrevistador INNER JOIN periodos ON aspirantes.id_periodo = periodos.id_periodo INNER JOIN programa ON aspirantes.id_programa = programa.id_programa; ',
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      result.forEach(val => {
        val.periodo = `${val.año}-${val.semestre}`;
      });
      res.send(result);
    }
  });
});

app.get("/aspirantes/:id_aspirante", (req, res) => {
  const id_aspirante = req.params.id_aspirante;
  connection.query(
    'SELECT * FROM aspirantes WHERE id_aspirante = ?',id_aspirante,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener el aspirante");
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id_aspirante = req.body.id_aspirante;
  const nombre_aspirante = req.body.nombre_aspirante;
  const codigo_carnet = req.body.codigo_carnet;
  const email_aspirante = req.body.email_aspirante;
  const telefono_aspirante = req.body.telefono_aspirante;
  const id_entrevistador = req.body.id_entrevistador;
  const id_periodo = req.body.id_periodo;
  const id_programa = req.body.id_programa;
  
  connection.query('UPDATE aspirantes SET nombre_aspirante= ?, codigo_carnet= ?, email_aspirante= ?, telefono_aspirante= ?, id_entrevistador= ?, id_periodo= ?, id_programa= ? WHERE id_aspirante= ?', [nombre_aspirante, codigo_carnet, email_aspirante, telefono_aspirante, id_entrevistador, id_periodo, id_programa, id_aspirante], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id_aspirante", (req, res) => {
  const id_aspirante = req.params.id_aspirante;
  
  connection.query('DELETE FROM aspirantes WHERE id_aspirante= ?',id_aspirante,
    (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/periodo", (req, res) => {
  connection.query('SELECT * FROM periodos',
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteperiodo/:id_periodo", (req, res) => {
  const id_periodo = req.params.id_periodo;
  
  // Agregar registro de depuración para el inicio de la operación
  console.log(`Intentando eliminar periodo con ID: ${id_periodo}`);

  connection.query('DELETE FROM periodos WHERE id_periodo =?', id_periodo, 
  (err, result) => {
    if (err) {
      // Registrar el error para depuración
      console.error('Error al eliminar el programa:', err);

      // Enviar respuesta con estado 500 y el error
      res.status(500).json({
        message: 'Error interno del servidor',
        details: err
      });
    } else {
      // Registrar éxito para depuración
      console.log(`Programa con ID: ${id_periodo} eliminado exitosamente`);

      // Enviar respuesta con resultado de la operación
      res.json({
        success: true,
        message: 'Programa eliminado correctamente',
        affectedRows: result.affectedRows
      });
    }
  });
});

app.get("/entrevistador", (req, res) => {
  connection.query('SELECT * FROM entrevistador',
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/programa", (req, res) => {
  connection.query('SELECT * FROM programa',
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteprograma/:id_programa", (req, res) => {
  const id_programa = req.params.id_programa;
  
  // Agregar registro de depuración para el inicio de la operación
  console.log(`Intentando eliminar programa con ID: ${id_programa}`);

  connection.query('DELETE FROM programa WHERE id_programa =?', id_programa, 
  (err, result) => {
    if (err) {
      // Registrar el error para depuración
      console.error('Error al eliminar el programa:', err);

      // Enviar respuesta con estado 500 y el error
      res.status(500).json({
        message: 'Error interno del servidor',
        details: err
      });
    } else {
      // Registrar éxito para depuración
      console.log(`Programa con ID: ${id_programa} eliminado exitosamente`);

      // Enviar respuesta con resultado de la operación
      res.json({
        success: true,
        message: 'Programa eliminado correctamente',
        affectedRows: result.affectedRows
      });
    }
  });
});

app.get("/criterios", (req, res) => {
  connection.query('SELECT * FROM criterios',
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/sub_criterios", (req, res) => {
  connection.query('SELECT * FROM sub_criterios',
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/Entrevista", (req, res) => {
  const notas_sub_criterios = req.body.nota_sub_criterio_aspirante;
  const id_aspirante = req.body.id_aspirante;

  console.log("Recibido:", id_aspirante, notas_sub_criterios);

  // Iterar sobre el objeto de notas_sub_criterios
  Object.entries(notas_sub_criterios).forEach(([id_sub_criterio, nota_sub_criterio]) => {
    connection.query(
      'INSERT INTO sub_criterio_aspirante (nota_sub_criterio_aspirante, id_aspirante, id_sub_criterio) VALUES (?, ?, ?)',
      [nota_sub_criterio, id_aspirante, id_sub_criterio],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Registro insertado correctamente:", result);
        }
      }
    );
  });

  res.send("Registros insertados correctamente");
});

app.get("/informacion_basica/:id_aspirante", (req, res) => {
  const id_aspirante = req.params.id_aspirante;

  connection.query('SELECT * FROM informacion_basica WHERE id_aspirante = ?', [id_aspirante], (err, result) => {
    if (err) {
      console.error("Error al obtener la información básica del aspirante:", err);
      res.status(500).json({ error: "Error al obtener la información básica del aspirante" });
    } else {
      res.json(result); // Devuelve el resultado de la consulta como JSON
    }
  });
});

// Modifica la ruta para guardar datos en la tabla informacion_basica
app.post("/informacion_basica", (req, res) => {
  const { id_aspirante, nota_general } = req.body; // Ajusta esto según la estructura de los datos que recibas del frontend

  // Realiza la inserción o actualización en la tabla informacion_basica
  connection.query(
    'INSERT INTO informacion_basica (id_aspirante, nota_general) VALUES (?, ?) ON DUPLICATE KEY UPDATE nota_general = VALUES(nota_general)',
    [id_aspirante, nota_general], // Ajusta los campos según la estructura de tu tabla
    (err, result) => {
      if (err) {
        console.error("Error al insertar en la tabla informacion_basica:", err);
        res.status(500).send("Error al guardar los datos en la tabla informacion_basica.");
      } else {
        res.send(result);
      }
    }
  );
});




app.post("/login", (req, res) => {
  const { email_entrevistador, contraseña } = req.body;
  connection.query(
    'SELECT * FROM entrevistador WHERE email_entrevistador = ? AND contraseña = ?',
    [email_entrevistador, contraseña],
    (err, results) => {
      if (err) {
        console.error("Error al verificar las credenciales:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      if (results.length > 0) {
        return res.json({ mensaje: "Inicio de sesión exitoso" });
      } else {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
    }
  );
});

app.get("/sub_criterios-notas", (req, res) => {
  const id_aspirante = req.query.id_aspirante;
  console.log("ID del aspirante recibido:", id_aspirante);
  connection.query('SELECT * FROM sub_criterio_aspirante WHERE id_aspirante = ?', [id_aspirante],
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los subcriterios con notas");
    } else {
      res.send(result);
    }
  });
});

app.post("/guarda_porcentaje", (req, res) => {
  const porcentaje_probabilidad = req.body.porcentaje_probabilidad;
  const id_aspirante = req.body.id_aspirante;
  connection.query('INSERT INTO porcentaje_desercion(porcentaje_probabilidad,id_aspirante ) VALUES (?, ?)',
  [porcentaje_probabilidad, id_aspirante], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/obtener_porcentaje", (req, res) => {
  const id_aspirante = req.query.id_aspirante;
  console.log("ID del aspirante recibido:", id_aspirante);
  connection.query('SELECT * FROM porcentaje_desercion WHERE id_aspirante = ?', [id_aspirante],
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los porcentajes");
    } else {
      res.send(result);
    }
  });
});

app.put("/update_Porcentaje", (req, res) => {
  const id_aspirante = req.body.id_aspirante;
  const porcentaje_probabilidad = req.body.porcentaje_probabilidad;

  connection.query('UPDATE porcentaje_desercion SET porcentaje_probabilidad =? WHERE id_aspirante= ?', [porcentaje_probabilidad,id_aspirante], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createcriterio", (req, res) => {
  const nombre_criterio = req.body.nombre_criterio;
  const porcentaje_criterio = req.body.porcentaje_criterio;

  connection.query('INSERT INTO criterios(nombre_criterio, porcentaje_criterio) VALUES (?, ?)',
  [nombre_criterio, porcentaje_criterio], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createsubcriterio", (req, res) => {
  const nombre_sub_criterio = req.body.nombre_sub_criterio;
  const descripcion_sub_criterio = req.body.descripcion_sub_criterio;
  const id_criterio = req.body.id_criterio;
  const nota_minima  = req.body.nota_minima;
  const nota_maxima  = req.body.nota_maxima;

  connection.query('INSERT INTO sub_criterios(nombre_sub_criterio, descripcion_sub_criterio,id_criterio, nota_minima, nota_maxima) VALUES (?,?,?,?,?)',
  [nombre_sub_criterio, descripcion_sub_criterio,id_criterio,nota_minima,nota_maxima], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletesub-criterio/:id_sub_criterio", (req, res) => {
  const id_sub_criterio = req.params.id_sub_criterio;
  
  // Agregar registro de depuración para el inicio de la operación
  console.log(`Intentando eliminar programa con ID: ${id_sub_criterio}`);

  connection.query('DELETE FROM sub_criterios where id_sub_criterio = ?', id_sub_criterio, 
  (err, result) => {
    if (err) {
      // Registrar el error para depuración
      console.error('Error al eliminar el sub-criterio:', err);

      // Enviar respuesta con estado 500 y el error
      res.status(500).json({
        message: 'Error interno del servidor',
        details: err
      });
    } else {
      // Registrar éxito para depuración
      console.log(`Sub-criterio con ID: ${id_sub_criterio} eliminado exitosamente`);

      // Enviar respuesta con resultado de la operación
      res.json({
        success: true,
        message: 'Sub-criterio eliminado correctamente',
        affectedRows: result.affectedRows
      });
    }
  });
});


app.delete("/deletecritero/:id_criterio", (req, res) => {
  const id_criterio = req.params.id_criterio;
  connection.query('DELETE FROM criterios WHERE id_criterio = ?', id_criterio,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar el criterio");
      } else {
        res.status(200).send("Criterio eliminado correctamente");
      }
    });
});

app.get("/obtener_porcentaje", (req, res) => {
  const id_aspirante = req.query.id_aspirante;
  console.log("ID del aspirante recibido:", id_aspirante);
  connection.query('SELECT * FROM sub_criterio_aspirante WHERE sub_criterio_aspirante.id_aspirante =?', [id_aspirante],
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los porcentajes");
    } else {
      res.send(result);
    }
  });
});

app.get("/entrevista/:id_aspirante", (req, res) => {
  const id_aspirante = req.params.id_aspirante;

  connection.query('SELECT * FROM sub_criterio_aspirante WHERE sub_criterio_aspirante.id_aspirante =?', [id_aspirante], (err, result) => {
    if (err) {
      console.error("Error al obtener la entrevista del aspirante:", err);
      res.status(500).json({ error: "Error al obtener la entrevista del aspirante" });
    } else {
      res.json(result); // Devuelve el resultado de la consulta como JSON
    }
  });
});

app.put("/update_nota", (req, res) => {
  const nota_sub_criterio_aspirante = req.body.nota_sub_criterio_aspirante;
  const id_sub_criterio = req.body.id_sub_criterio
  const id_aspirante = req.body.id_aspirante;
 
  connection.query('UPDATE sub_criterio_aspirante SET nota_sub_criterio_aspirante = ? WHERE id_sub_criterio = ? AND id_aspirante = ?;', [nota_sub_criterio_aspirante,id_sub_criterio, id_aspirante], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/eliminar_porcentaje_desercion/:idAspirante", (req, res) => {
  const idAspirante = req.params.idAspirante;

  connection.query('DELETE FROM porcentaje_desercion WHERE id_aspirante = ?', [idAspirante], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar registros en porcentaje_desercion");
    } else {
      res.send(result);
    }
  });
});

app.delete("/eliminar_subcriterios_aspirante/:idAspirante", (req, res) => {
  const idAspirante = req.params.idAspirante;

  connection.query('DELETE FROM sub_criterio_aspirante WHERE id_aspirante = ?', [idAspirante], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar registros en sub_criterio_aspirante");
    } else {
      res.send(result);
    }
  });
});

app.post("/createperiodo", (req, res) => {
  const año = req.body.año;
  const semestre = req.body.semestre;

  connection.query('INSERT INTO periodos(año, semestre) VALUES (?, ?)',
  [año, semestre], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createprograma", (req, res) => {
  const nombre_programa = req.body.nombre_programa;

  connection.query('INSERT INTO programa(nombre_programa) VALUES (?)',
  [nombre_programa], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001,()=>{
  console.log("Corriendo en el puerto 3001")
})

