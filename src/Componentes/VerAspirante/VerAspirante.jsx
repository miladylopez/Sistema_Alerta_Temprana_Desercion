import React, { useState } from 'react';
import '../VerAspirante/VerAspirante.css';
import Axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2'


const Inicio = ()=>{
  const [aspirantesList, setAspirantes] = useState([]);
  const [nombre_aspirante, setNombre] = useState('');
  const [codigo_carnet, setCodigoCarnet] = useState('');
  const [email_aspirante, setEmail] = useState('');
  const [telefono_aspirante, setTelefono] = useState('');
  const [id_aspirante, setId_aspirante] = useState('');
  const [modalActualizar, setModalActualizar] = useState(false);

  const mostrarModalActualizar = (val) => {
    setNombre(val.nombre_aspirante);
    setCodigoCarnet(val.codigo_carnet);
    setEmail(val.email_aspirante);
    setTelefono(val.telefono_aspirante);
    setId_aspirante(val.id_aspirante);
    setModalActualizar(true);
  };
  
  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
      id_aspirante : id_aspirante,
      nombre_aspirante: nombre_aspirante,
      codigo_carnet: codigo_carnet,
      email_aspirante: email_aspirante,
      telefono_aspirante: telefono_aspirante,
    }).then(() => {
      getAspirantes();
      limpiarCampos();
      Swal.fire({
        title : "<strong> Actualizacion exitosa!!!</strong>",
        html: "<i>El aspirante <strong>"+nombre_aspirante+"</strong> fue actualizado con éxito</i>",
        icon: 'success'
      }).then(() => {
        cerrarModalActualizar();
      });
    });
  };
  const deleteAspir = (val)=>{
    
    Swal.fire({
      title: "Confirmar eliminado",
      html: "<i>Realmente desea elimina a <strong>"+val.nombre_aspirante+"</strong></i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id_aspirante}`).then(() => {
          getAspirantes();
          limpiarCampos();
          Swal.fire({
            icon: "success",
            title: val.nombre_aspirante+ " fue eliminado",
            showConfirmButton: false,
            timer: 2000
          });
        });
      }
    });
    
  };
  
  const getAspirantes = () => {
    Axios.get("http://localhost:3001/aspirantes").then((response) => {
      setAspirantes(response.data);
    });
  };

  getAspirantes();

  const limpiarCampos =()=>{
    setNombre("");
    setCodigoCarnet("");
    setEmail("");
    setTelefono("");
    setId_aspirante("");
  }

  return (
    <div className="container">
      <div className="card" >
        <div className="card-header">
          Aspirantes 
        </div>
        <ul className="list-group list-group-flush">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Código</th>
              <th scope="col">Email</th>
              <th scope="col">Telefono</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {aspirantesList.map((val,key) => {
              return (
                <tr key={val.id_aspirante}>
                  <td>{val.nombre_aspirante}</td>
                  <td>{val.codigo_carnet}</td>
                  <td>{val.email_aspirante}</td>
                  <td>{val.telefono_aspirante}</td>
                  <td>  
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-info" onClick={() => mostrarModalActualizar(val)}>Editar</button>
                      <button type="button" onClick={()=>deleteAspir(val)} className="btn btn-danger">Eliminar</button>
                      <button type="button" className="btn btn-success">Entrevista</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </ul>
      </div>
      
      <Modal isOpen={modalActualizar}>
        <ModalHeader>
          <div><h3>Editar Registro Aspirante</h3></div>
        </ModalHeader>
        <ModalBody>
          <div className="input-group mb-3 col-12">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value= {nombre_aspirante}
              onChange={(event) => setNombre(event.target.value)}
              className="form-control h-100"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Codigo Aspirante: </span>
            <input type="text" value= {codigo_carnet}
              onChange={(event) => setCodigoCarnet(event.target.value)}
              className="form-control h-100"  />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Email: </span>
            <input type="text" value= {email_aspirante} 
              onChange={(event) => setEmail(event.target.value)}
              className="form-control h-100" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Numero Telefono: </span>
            <input type="text"  value= {telefono_aspirante}
              onChange={(event) => setTelefono(event.target.value)}
              className="form-control h-100" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-warning" onClick={update}>Actualizar</Button>
          <Button className="btn btn-danger" onClick={cerrarModalActualizar}>Cancelar</Button>
          
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Inicio;
