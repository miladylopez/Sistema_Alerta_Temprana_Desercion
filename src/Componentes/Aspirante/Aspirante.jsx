import React, { useState } from 'react';
import '../Aspirante/Aspirante.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

function AgregarAspirante() {
  const [nombre_aspirante, setNombre] = useState('');
  const [codigo_carnet, setCodigoCarnet] = useState('');
  const [email_aspirante, setEmail] = useState('');
  const [telefono_aspirante, setTelefono] = useState('');
  const [id_aspirante, setId_aspirante] = useState('');
  

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre_aspirante: nombre_aspirante,
      codigo_carnet: codigo_carnet,
      email_aspirante: email_aspirante,
      telefono_aspirante: telefono_aspirante,
      id_aspirante : id_aspirante
    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title : "<strong> Registro exitoso!!!</strong>",
        html: "<i>El aspirante <strong>"+nombre_aspirante+"</strong> fue registrado con éxito</i>",
        icon: 'success'
      }).then(() => {
        window.location.href = '/Inicio';
      });
    })
  }

  const limpiarCampos =()=>{
    setNombre("");
    setCodigoCarnet("");
    setEmail("");
    setTelefono("");
    setId_aspirante("");
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          Añadir Aspirantes
        </div>
        <div className="card-body">
          <div className="input-group mb-3 col-12 ">
            <span className="input-group-text " id="basic-addon1">Nombre:</span>
            <input type="text" 
            onChange={(event)=>{
              setNombre(event.target.value);
            }}
            className="form-control h-100" placeholder="Escribe el nombre del aspirante" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">Codigo Aspirante: </span>
            <input type="text" 
            onChange={(event)=>{
              setCodigoCarnet(event.target.value);
            }}
            className="form-control h-100" placeholder="Escribe el codigo del aspirante" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">Email: </span>
              <input type="text" 
                onChange={(event)=>{
                  setEmail(event.target.value);
                }}
                className="form-control h-100" placeholder="Escribe el Email del aspirante" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">Numero Telefono: </span>
              <input type="text" 
                onChange={(event)=>{
                  setTelefono(event.target.value); 
                }}
                className="form-control h-100" placeholder="Escribe el numero telefónico del aspirante" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-primary" onClick={add}>Guardar Aspirante</button>
        </div>
      </div>
    </div>
  );
}

export default AgregarAspirante;