const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SistemaAlerta',
  database: 'sistema_alerta_temprana'
});

/*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root-SAT',
  password: 'SistemaAlerta12345!',
  database: 'sistema_alerta_temprana'
});
*/
app.post("/createUser", (req, res) => {
  const nombre_entrevistador = req.body.nombre_entrevistador;
  const email_entrevistador = req.body.email_entrevistador;
  const contraseña = req.body.contraseña;
  const telefono_entrevistador = req.body.telefono_entrevistador;

  connection.query('INSERT INTO entrevistador(nombre_entrevistador, email_entrevistador, contraseña, telefono_entrevistador) VALUES (?, ?, ?, ?)',
  [nombre_entrevistador, email_entrevistador, contraseña, telefono_entrevistador], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
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


