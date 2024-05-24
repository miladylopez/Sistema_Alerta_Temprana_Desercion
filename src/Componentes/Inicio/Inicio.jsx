import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import foto1 from "../../Imagenes/Foto1.jpg";
import calendario from "../../Imagenes/calendario.avif";
import programa from "../../Imagenes/programa.jpg";
import criterio from "../../Imagenes/criterio.avif";
import sub_criterio from "../../Imagenes/subcriterio.jpg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";

import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";

const Inicio = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarprograma, setMostrarprograma] = useState(false);
  const [mostrarPeriodo, setMostrarPeriodo] = useState(false);
  const [modalAñadirsub, setModalAñadirsub] = useState(false);
  const [modalAñadirCriterio, setModalAñadirCrierio] = useState(false);
  const [año, setAño] = useState("");
  const [semestre, setSemestre] = useState("");
  const [nombre_programa, setNombre_programa] = useState("");
  const [programas, setProgramas] = useState([]); // Estado para almacenar los programas
  const [periodos, setPeriodos] = useState([]); // Estado para almacenar los periodos
  const [criterios, setCriterios] = useState([]);
  const [sub_criterios, setSub_criterios] = useState([]);
  const [nombre_criterio, setNombre_criterio] = useState("");
  const [porcentaje_criterio, setPorcentaje_criterio] = useState("");
  const [nombre_sub_criterio, setNombre_sub_criterio] = useState("");
  const [descripcion_sub_criterio, setDescripcion_sub_criterio] = useState("");
  const [nota_minima, setNota_minima] = useState("");
  const [nota_maxima, setNota_maxima] = useState("");
  const [id_criterio, setId_Criterio] = useState("");

  // Función para obtener los programas desde el backend
  const fetchProgramas = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/programa`
      );
      setProgramas(response.data);
    } catch (error) {
      console.error("Error al obtener los programas:", error);
    }
  };

  const fetchPeriodos = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/periodo`
      );
      setPeriodos(response.data);
    } catch (error) {
      console.error("Error al obtener los periodos:", error);
    }
  };
  const openModalañadirCriterio = () => {
    setModalAñadirCrierio(true);
  };

  const openModalañadirsubCriterio = () => {
    setModalAñadirsub(true);
  };

  useEffect(() => {
    if (mostrarprograma) {
      fetchProgramas();
    }
  }, [mostrarprograma]);

  useEffect(() => {
    if (mostrarPeriodo) {
      fetchPeriodos();
    }
  }, [mostrarPeriodo]);

  const openModalañadi = () => {
    setMostrarModal(true);
    setMostrarPeriodo(true);
  };

  const openModalprograma = () => {
    setMostrarprograma(true);
  };
  useEffect(() => {
    if (modalAñadirCriterio) {
      getCriterios();
    }
  }, [modalAñadirCriterio]);

  useEffect(() => {
    if (modalAñadirsub) {
      getSub_criterios();
      getCriterios();
    }
  }, [modalAñadirsub]);

  const cerrarModal = () => {
    setMostrarModal(false);
    setMostrarprograma(false);
    setMostrarPeriodo(false);
    setModalAñadirCrierio(false);
    setModalAñadirsub(false);
  };
  const getSub_criterios = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/sub_criterios`)
      .then((response) => {
        setSub_criterios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los criterios:", error);
      });
  };
  const añadirsubcriterio = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/createsubcriterio`, {
      nombre_sub_criterio: nombre_sub_criterio,
      descripcion_sub_criterio: descripcion_sub_criterio,
      id_criterio: id_criterio,
      nota_minima: nota_minima,
      nota_maxima: nota_maxima,
    })
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong> Registro exitoso!!!</strong>",
          html:
            "<i>El Sub-criterio <strong>" +
            nombre_sub_criterio +
            "</strong> fue registrado con éxito</i>",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          limpiarCampos();
          getSub_criterios();
        });
      })
      .catch((error) => {
        console.error("Error al agregar el aspirante:", error);
      });
  };

  const getCriterios = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/criterios`)
      .then((response) => {
        setCriterios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los criterios:", error);
      });
  };

  const deleteCriterio = (id_criterio) => {
    Swal.fire({
      title: "Confirmar eliminado",
      html:
        "<i>¿Realmente desea eliminar este criterio? <strong>" +
        "</strong></i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(
          `${process.env.REACT_APP_API_URL}/deletecritero/${id_criterio}`
        )
          .then((response) => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El criterio ha sido eliminado correctamente.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            getCriterios();
          })
          .catch((error) => {
            console.error("Error al eliminar el criterio:", error);
          });
      }
    });
  };

  const deletesub_criterio = (id_sub_criterio) => {
    Swal.fire({
      title: "Confirmar eliminado",
      html:
        "<i>¿Realmente desea eliminar este Sub-criterio? <strong>" +
        "</strong></i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(
          `${process.env.REACT_APP_API_URL}/deletesub-criterio/${id_sub_criterio}`
        )
          .then((response) => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El sub-criterio ha sido eliminado correctamente.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            getSub_criterios();
          })
          .catch((error) => {
            console.error("Error al eliminar el criterio:", error);
          });
      }
    });
  };

  const añadircriterio = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/createcriterio`, {
      nombre_criterio: nombre_criterio,
      porcentaje_criterio: porcentaje_criterio,
    })
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong> Registro exitoso!!!</strong>",
          html:
            "<i>El criterio <strong>" +
            nombre_criterio +
            "</strong> fue registrado con éxito</i>",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          limpiarCampos();
          getCriterios();
        });
      })
      .catch((error) => {
        console.error("Error al agregar el aspirante:", error);
      });
  };


  const añadirperiodo = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/createperiodo`, {
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
        console.error("Error al agregar el periodo:", error);
      });
  };

  const añadirprograma = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/createprograma`, {
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
        console.error("Error al agregar el programa:", error);
      });
  };

  const eliminarPrograma = (id_programa) => {
    console.log("ID del programa a eliminar:", id_programa);
    Axios.delete(
      `${process.env.REACT_APP_API_URL}/deleteprograma/${id_programa}`
    )
      .then((response) => {
        Swal.fire({
          title: "¡Eliminado!",
          text: "El programa ha sido eliminado correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        fetchProgramas();
      })
      .catch((error) => {
        console.error("Error al eliminar el programa:", error);
        if (error.response && error.response.status === 500) {
          // Error específico cuando hay una restricción de clave externa
          Swal.fire({
            title: "Error al eliminar el programa",
            text: "Intentas eliminar un programa asignado a un aspirante. Por favor, edita el registro del aspirante primero y después puedes eliminar el programa.",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          // Otro tipo de errores
          Swal.fire({
            title: "Error",
            text: "Se ha producido un error al eliminar el programa.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };

  const eliminarPeriodo = (id_periodo) => {
    console.log("ID del periodo a eliminar:", id_periodo);
    Axios.delete(`${process.env.REACT_APP_API_URL}/deleteperiodo/${id_periodo}`)
      .then((response) => {
        Swal.fire({
          title: "¡Eliminado!",
          text: "El periodo ha sido eliminado correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        fetchPeriodos();
      })
      .catch((error) => {
        console.error("Error al eliminar el periodo:", error);
        if (error.response && error.response.status === 500) {
          // Error específico cuando hay una restricción de clave externa
          Swal.fire({
            title: "Error al eliminar el periodo",
            text: "Intentas eliminar un periodo asignado a un estudiante. Por favor, edita el registro del aspirante primero y después puedes eliminar el periodo.",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          // Otro tipo de errores
          Swal.fire({
            title: "Error",
            text: "Se ha producido un error al eliminar el periodo.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };
  const limpiarCampos = () => {
    setAño("");
    setSemestre("");
    setNombre_programa("");
    setNombre_criterio("");
    setPorcentaje_criterio("");
    setNombre_sub_criterio("");
    setDescripcion_sub_criterio("");
    setNota_minima("");
    setNota_maxima("");
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
              Prototipo de sistema de alerta temprana de deserción desde el proceso de admisión,
              creado con el propósito de poder tener una alerta de los estudiantes que podrían estar
              en riesgo de deserción desde que son aspirantes a la Facultad de Ingeniería y que se les
              pueda llevar un acompañamiento más cercano, ofreciendo los diferentes tipos de ayuda que brinda la UNAC.
              Prototipo de sistema de alerta temprana de deserción desde el proceso de admisión,
              creado con el propósito de poder tener una alerta de los estudiantes que podrían estar
              en riesgo de deserción desde que son aspirantes a la Facultad de Ingeniería y que se les
              pueda llevar un acompañamiento más cercano, ofreciendo los diferentes tipos de ayuda que brinda la UNAC.
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
                          href="/alertas/aspirante"
                          role="button"
                          data-bs-toggle="button"
                        >
                          <div className="boton-añadir-aspirante">
                            <div className="row justify-content-center align-items-center">
                              <div className="col d-flex align-items-center">
                                <div className="icon-añadir-asipirante">
                                  <a
                                    href="/alertas/aspirante"
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
                          href="/alertas/verAspirante"
                          role="button"
                          data-bs-toggle="button"
                        >
                          <div className="boton-añadir-aspirante2">
                            <div className="row justify-content-center align-items-center">
                              <div className="col d-flex align-items-center">
                                <div className="icon-añadir-asipirante2">
                                  <a
                                    href="/alertas/verAspirante"
                                    className="btn1 btn-primary2 btn-separator"
                                    role="button"
                                    data-bs-toggle="button"
                                  >
                                    <MDBIcon far icon="address-book" />
                                  </a>
                                </div>
                                <div className="flex-grow-1 texto-añadir-aspirante2">
                                  <h5 className="card-añadir-aspirante">
                                    Ver Aspirante
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
                                  Añadir Periodo
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
                  <div className="col-sm-4">
                    <div className="card1-inicio">
                      <div
                        role="button"
                        data-bs-toggle="button"
                        onClick={() => openModalañadirCriterio()}
                        className="card text-center mb-4 boton-aspirante"
                      >
                        <div className="boton-añadir-aspirante4">
                          <div className="row justify-content-center align-items-center">
                            <div className="col d-flex align-items-center">
                              <div className="icon-añadir-asipirante5">
                                <div
                                  onClick={() => openModalañadirCriterio()}
                                  className="btn1 btn-primary5 btn-separator"
                                  role="button"
                                  data-bs-toggle="button"
                                >
                                  <MDBIcon fas icon="fas fa-list-ol" />
                                </div>
                              </div>
                              <div className="flex-grow-1 texto-añadir-aspirante4">
                                <h5 className="card-añadir-aspirante5">
                                  Añadir Criterio
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
                        onClick={() => openModalañadirsubCriterio()}
                        className="card text-center mb-4 boton-aspirante"
                      >
                        <div className="boton-añadir-aspirante4">
                          <div className="row justify-content-center align-items-center">
                            <div className="col d-flex align-items-center">
                              <div className="icon-añadir-asipirante6">
                                <div
                                  onClick={() => openModalañadirsubCriterio()}
                                  className="btn1 btn-primary6 btn-separator"
                                  role="button"
                                  data-bs-toggle="button"
                                >
                                  <MDBIcon fas icon="fas fa-list-check" />
                                </div>
                              </div>
                              <div className="flex-grow-1 texto-añadir-aspirante4">
                                <h5 className="card-añadir-aspirante6">
                                  Añadir Sub-Criterio
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
          Añadir un Período
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
              <div className="mt-3">
                <h5>Períodos Existentes:</h5>
                <ul className="list-group">
                  {periodos.map((periodos) => (
                    <li
                      key={periodos.id_periodo}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {periodos.año}-{periodos.semestre}
                      <button
                        type="button"
                        onClick={() => eliminarPeriodo(periodos.id_periodo)}
                        className="btn btn-outline-danger"
                        title="Eliminar"
                      >
                        <MdDeleteForever size="1.5rem" />
                      </button>
                    </li>
                  ))}
                </ul>
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
          Añadir un Programa
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
                  placeholder="Escribe el programa. Ej: sistemas"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#f47f7f" }}
                />
              </div>
              <div className="mt-3">
                <h5>Programas Existentes:</h5>
                <ul className="list-group">
                  {programas.map((programa) => (
                    <li
                      key={programa.id_programa}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {programa.nombre_programa}
                      <button
                        type="button"
                        onClick={() => eliminarPrograma(programa.id_programa)}
                        className="btn btn-outline-danger"
                        title="Eliminar"
                      >
                        <MdDeleteForever size="1.5rem" />
                      </button>
                    </li>
                  ))}
                </ul>
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
      <Modal isOpen={modalAñadirCriterio} className="custom-modal">
        <ModalHeader style={{ color: "#8F9FBF" }}>
          Añadir un criterio nuevo
        </ModalHeader>
        <ModalBody>
          <div className="card text-center mb-3">
            <img src={criterio} className="criterio" alt="..." />
            <div className="card-body">
              <div className="input-group mb-3 col-12 ">
                <span
                  className="input-group-text "
                  id="basic-addon1"
                  style={{ backgroundColor: "#8F9FBF", width: "150px" }}
                >
                  Nombre Criterio:
                </span>
                <input
                  type="text"
                  value={nombre_criterio}
                  onChange={(event) => setNombre_criterio(event.target.value)}
                  className="form-control h-150"
                  placeholder="Escribe el nombre del criterio"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#8F9FBF" }}
                />
              </div>
              <div className="input-group mb-3 ">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{ backgroundColor: "#8F9FBF" }}
                >
                  Porcentaje Criterio:
                </span>
                <input
                  type="text"
                  value={porcentaje_criterio}
                  onChange={(event) =>
                    setPorcentaje_criterio(event.target.value)
                  }
                  className="form-control h-150"
                  placeholder="Escribe el porcentaje, solo el número"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#8F9FBF" }}
                />
              </div>
              <div className="mt-3">
                <h5>Criterios existentes:</h5>
                <ul className="list-group">
                  {criterios.map((criterio) => (
                    <li
                      key={criterio.id_criterio}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {criterio.nombre_criterio}
                      <button
                        type="button"
                        onClick={() => deleteCriterio(criterio.id_criterio)}
                        className="btn btn-outline-danger"
                        title="Eliminar"
                      >
                        <MdDeleteForever size="1.5rem" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#8F9FBF", borderBlockColor: "#00aba9" }}
            onClick={añadircriterio}
          >
            Guardar
          </Button>
          <Button className="btn btn-danger" onClick={cerrarModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalAñadirsub} className="custom-modal">
        <ModalHeader style={{ color: "#8038c2" }}>
          Añadir un sub-criterio nuevo
        </ModalHeader>
        <ModalBody>
          <div className="card text-center mb-3">
            <img src={sub_criterio} className="sub_criterio" alt="..." />
            <div className="card-body">
              <div className="input-group mb-3 col-12 ">
                <span
                  className="input-group-text "
                  id="basic-addon1"
                  style={{
                    backgroundColor: "#8038c2",
                    width: "200px",
                    color: "white",
                  }}
                >
                  Nombre Sub-Criterio:
                </span>
                <input
                  type="text"
                  value={nombre_sub_criterio}
                  onChange={(event) =>
                    setNombre_sub_criterio(event.target.value)
                  }
                  className="form-control h-150"
                  placeholder="Escribe el nombre del sub-criterio"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#8038c2" }}
                />
              </div>
              <div className="input-group mb-3 ">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{
                    backgroundColor: "#8038c2",
                    width: "200px",
                    color: "white",
                  }}
                >
                  Descripción Sub-Criterio:
                </span>
                <input
                  type="text"
                  value={descripcion_sub_criterio}
                  onChange={(event) =>
                    setDescripcion_sub_criterio(event.target.value)
                  }
                  className="form-control h-150"
                  placeholder="Escribe la decripción del subcriterio"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#8038c2" }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputState"
                  style={{
                    backgroundColor: "#8038c2",
                    width: "200px",
                    color: "white",
                  }}
                >
                  Criterio:
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(event) => setId_Criterio(event.target.value)}
                  style={{ borderColor: "#8038c2" }}
                >
                  <option value="">Selecciona el criterio</option>
                  {criterios &&
                    criterios.map &&
                    criterios.map((val) => (
                      <option key={val.id_criterio} value={val.id_criterio}>
                        {val.nombre_criterio}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-group mb-3 ">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{
                    backgroundColor: "#8038c2",
                    width: "200px",
                    color: "white",
                  }}
                >
                  Nota minima:
                </span>
                <input
                  type="text"
                  value={nota_minima}
                  onChange={(event) => setNota_minima(event.target.value)}
                  className="form-control h-150"
                  placeholder="Escribe la nota minima"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#8038c2" }}
                />
              </div>
              <div className="input-group mb-3 ">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{
                    backgroundColor: "#8038c2",
                    width: "200px",
                    color: "white",
                  }}
                >
                  Nota Maxima:
                </span>
                <input
                  type="text"
                  value={nota_maxima}
                  onChange={(event) => setNota_maxima(event.target.value)}
                  className="form-control h-150"
                  placeholder="Escribe la nota maxima"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ borderColor: "#8038c2" }}
                />
              </div>
              <div className="mt-3">
                <h5>Sub-criterios existentes:</h5>
                <ul className="list-group">
                {criterios.map((criterio) => (
                  <li key={criterio.id_criterio} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong>{criterio.nombre_criterio}</strong>
                     
                    </div>
                    <ul className="list-group mt-2">
                      {sub_criterios
                        .filter(
                          (sub_criterio) =>
                            sub_criterio.id_criterio ===
                            criterio.id_criterio
                        )
                        .map((sub_criterio) => (
                          <li
                            key={sub_criterio.id_sub_criterio}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            {sub_criterio.nombre_sub_criterio}
                            <button
                        type="button"
                        onClick={() => deletesub_criterio(sub_criterio.id_sub_criterio)}
                        className="btn btn-outline-danger"
                        title="Eliminar"
                      >
                        <MdDeleteForever size="1.5rem" />
                      </button>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#8038c2", borderBlockColor: "#8038c2" }}
            onClick={añadirsubcriterio}
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
