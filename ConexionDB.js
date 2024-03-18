const express = require("express");
const app = express();
const mysql = require('mysql'); // Importa el paquete mysql
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Crea una conexión con la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'SistemaAlerta',
  database: 'sistema_alerta_temprana'
});

app.post("/create", (req, res) => {
  const nombre_aspirante = req.body.nombre_aspirante;
  const codigo_carnet = req.body.codigo_carnet;
  const email_aspirante = req.body.email_aspirante;
  const telefono_aspirante = req.body.telefono_aspirante;
  
  connection.query('INSERT INTO aspirantes(nombre_aspirante, codigo_carnet, email_aspirante, telefono_aspirante) VALUES (?, ?, ?, ?)', [nombre_aspirante, codigo_carnet, email_aspirante, telefono_aspirante], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/aspirantes", (req, res) => {
  connection.query('SELECT * FROM aspirantes',
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id_aspirante = req.body.id_aspirante;
  const nombre_aspirante = req.body.nombre_aspirante;
  const codigo_carnet = req.body.codigo_carnet;
  const email_aspirante = req.body.email_aspirante;
  const telefono_aspirante = req.body.telefono_aspirante;
  
  connection.query('UPDATE aspirantes SET nombre_aspirante= ?, codigo_carnet= ?, email_aspirante= ?, telefono_aspirante= ? WHERE id_aspirante= ?', [nombre_aspirante, codigo_carnet, email_aspirante, telefono_aspirante, id_aspirante], (err, result) => {
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



app.listen(3001,()=>{
  console.log("Corriendo en el puerto 3001")
})
