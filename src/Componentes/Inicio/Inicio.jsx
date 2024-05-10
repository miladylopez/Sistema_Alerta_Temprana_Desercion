import React, { useState } from "react";
import Axios from "axios";
import "../Inicio/Inicio.css";
import "bootstrap/dist/css/bootstrap.min.css";
import foto1 from "../../Imagenes/Foto1.jpg";
import calendario from "../../Imagenes/calendario.avif";
import programa from "../../Imagenes/programa.jpg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBCardText,
} from "mdb-react-ui-kit";

const Inicio = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarprograma, setMostrarprograma] = useState(false);
  const [año, setAño] = useState("");
  const [semestre, setSemestre] = useState("");
  const [nombre_programa, setNombre_programa] = useState("");

  const openModalañadi = () => {
    setMostrarModal(true);
  };
  const openModalprograma = () => {
    setMostrarprograma(true);
  };
  const cerrarModal = () => {
    setMostrarModal(false);
    setMostrarprograma(false);
  };
  const limpiarCampos = () => {
    setAño("");
    setSemestre("");
    setNombre_programa("");
  };

  const añadirperiodo = () => {
    Axios.post("https://ingenieria.unac.edu.co/alertas-srv/createperiodo", {
      año: año,
      semestre: semestre,
    })
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong> Registro exitoso!!!</strong>",
          html:
            "<i>El periodo <strong>" +
            año +
            "-" +
            semestre +
            "</strong> fue registrado con éxito</i>",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          cerrarModal();
        });
      })
      .catch((error) => {
        console.error("Error al agregar el aspirante:", error);
      });
  };
  const añadirprograma = () => {
    Axios.post("https://ingenieria.unac.edu.co/alertas-srv/createprograma", {
      nombre_programa: nombre_programa,
    })
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong> Registro exitoso!!!</strong>",
          html:
            "<i>El programa <strong>" +
            nombre_programa +
            "</strong> fue registrado con éxito</i>",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          cerrarModal();
        });
      })
      .catch((error) => {
        console.error("Error al agregar el aspirante:", error);
      });
  };
  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <div>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              ¡BIENVENIDOS AL <br />
              <span className="text-primary1">SISTEMA DE ALERTA TEMPRANA!</span>
            </h1>
            <p
              className="px-3"
              style={{ color: "hsl(217, 10%, 50.8%)", fontSize: "20px" }}
            >
              Prototipo de sistema de alerta temprana de deserción desde el
              proceso de admisión, creada con el propósito de poder tener una
              alerta de los estudiantes que podrían estar en riesgo de deserción
              desde que son aspirantes a la facultad de ingeniería y que se les
              pueda llevar un acompañamiento más cercano ofreciendo los
              diferentes tipos de ayuda que brinda la UNAC.
            </p>
          </div>
        </MDBCol>

        <MDBCol md="6" className="acciones">
          <MDBCard>
            <MDBCardImage src={foto1} position="top" />
            <MDBCardBody>
              <MDBCardText className="card-principal">
                <div className="row justify-content-center">
                  <div className="col-sm-4">
                    <div className="card1-inicio">
                      <div className="card text-center mb-4 boton-aspirante">
                        <a
                          href="aspirante"
                          role="button"
                          data-bs-toggle="button"
                        >
                          <div className="boton-añadir-aspirante">
                            <div className="row justify-content-center align-items-center">
                              <div className="col d-flex align-items-center">
                                <div className="icon-añadir-asipirante">
                                  <a
                                    href="aspirante"
                                    className="btn1 btn-primary btn-separator"
                                    role="button"
                                    data-bs-toggle="button"
                                  >
                                    <MDBIcon fas icon="pen-alt" />
                                  </a>
                                </div>
                                <div className="flex-grow-1 texto-añadir-aspirante">
                                  <h5 className="card-añadir-aspirante">
                                    Añadir Aspirante
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="card1-inicio">
                      <div className="card text-center mb-4 boton-aspirante">
                        <a
                          href="verAspirante"
                          role="button"
                          data-bs-toggle="button"
                        >
                          <div className="boton-añadir-aspirante2">
                            <div className="row justify-content-center align-items-center">
                              <div className="col d-flex align-items-center">
                                <div className="icon-añadir-asipirante2">
                                  <a
                                    href="verAspirante"
                                    className="btn1 btn-primary2 btn-separator"
                                    role="button"
                                    data-bs-toggle="button"
                                  >
                                    <MDBIcon far icon="address-book" />
                                  </a>
                                </div>
                                <div className="flex-grow-1 texto-añadir-aspirante2">
                                  <h5 className="card-añadir-aspirante">
                                    Ver aspirante
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="card1-inicio">
                      <div
                        role="button"
                        data-bs-toggle="button"
                        onClick={() => openModalañadi()}
                        className="card text-center mb-4 boton-aspirante"
                      >
                        <div className="boton-añadir-aspirante3">
                          <div className="row justify-content-center align-items-center">
                            <div className="col d-flex align-items-center">
                              <div className="icon-añadir-asipirante3">
                                <div
                                  onClick={() => openModalañadi()}
                                  className="btn1 btn-primary3 btn-separator"
                                  role="button"
                                  data-bs-toggle="button"
                                >
                                  <MDBIcon far icon="calendar-alt" />
                                </div>
                              </div>
                              <div className="flex-grow-1 texto-añadir-aspirante2">
                                <h5 className="card-añadir-aspirante">
                                  Añadir periodo
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="card1-inicio">
                      <div
                        role="button"
                        data-bs-toggle="button"
                        onClick={() => openModalprograma()}
                        className="card text-center mb-4 boton-aspirante"
                      >
                        <div className="boton-añadir-aspirante4">
                          <div className="row justify-content-center align-items-center">
                            <div className="col d-flex align-items-center">
                              <div className="icon-añadir-asipirante4">
                                <div
                                  onClick={() => openModalprograma()}
                                  className="btn1 btn-primary4 btn-separator"
                                  role="button"
                                  data-bs-toggle="button"
                                >
                                  <MDBIcon fas icon="laptop-code" />
                                </div>
                              </div>
                              <div className="flex-grow-1 texto-añadir-aspirante4">
                                <h5 className="card-añadir-aspirante4">
                                  Añadir programa
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <Modal isOpen={mostrarModal} className="custom-modal">
        <ModalHeader style={{ color: "#00aba9" }}>
          Añadir un periodo
        </ModalHeader>
        <ModalBody>
          <div className="card text-center mb-3">
            <img src={calendario} className="calendario" alt="..." />
            <div className="card-body">
              <div className="input-group mb-3 col-12 ">
                <span
                  className="input-group-text "
                  id="basic-addon1"
                  style={{ backgroundColor: "#00aba9", width: "90px" }}
                >
                  Año:
                </span>
                <input
                  type=""
                  value={año}
                  onChange={(event) => setAño(event.target.value)}
                  className="form-control h-150 w-100px"
                  placeholder="Escribe el año. Ej: 2024"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#00aba9" }}
                />
              </div>
              <div className="input-group mb-3 ">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{ backgroundColor: "#00aba9", width: "90px" }}
                >
                  Semestre:
                </span>
                <input
                  type="text"
                  value={semestre}
                  onChange={(event) => setSemestre(event.target.value)}
                  className="form-control h-150"
                  placeholder="Escribe el semestre. Ej: 1"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#00aba9" }}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#00aba9", borderBlockColor: "#00aba9" }}
            onClick={añadirperiodo}
          >
            Guardar
          </Button>
          <Button className="btn btn-danger" onClick={cerrarModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={mostrarprograma} className="custom-modal">
        <ModalHeader style={{ color: "#f47f7f" }}>
          Añadir un programa
        </ModalHeader>
        <ModalBody>
          <div className="card text-center mb-3">
            <img src={programa} className="programa" alt="..." />
            <div className="card-body">
              <div className="input-group mb-3 col-12 ">
                <span
                  className="input-group-text "
                  id="basic-addon1"
                  style={{ backgroundColor: "#f47f7f", width: "90px" }}
                >
                  Programa:
                </span>
                <input
                  type=""
                  value={nombre_programa}
                  onChange={(event) => setNombre_programa(event.target.value)}
                  className="form-control h-150 w-100px"
                  placeholder="Escribe el sistema. Ej: sistemas"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#f47f7f" }}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#f47f7f", borderBlockColor: "#00aba9" }}
            onClick={añadirprograma}
          >
            Guardar
          </Button>
          <Button className="btn btn-danger" onClick={cerrarModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </MDBContainer>
  );
};

export default Inicio;