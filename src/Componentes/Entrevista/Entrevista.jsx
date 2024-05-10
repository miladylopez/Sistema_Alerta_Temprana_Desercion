import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Entrevista/Entrevista.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Card from "react-bootstrap/Card";
import Axios from "axios";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBInputGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

const Entrevista = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalAñadir, setModalAñadir] = useState(false);
  const [modalAñadirsub, setModalAñadirsub] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", content: "" });
  const { id_aspirante } = useParams();
  const [criterios, setCriterios] = useState([]);
  const [sub_criterios, setSub_criterios] = useState([]);
  const [nota_sub_criterio_aspirante, setNota_sub_criterio_aspirante] =
    useState({});
  const [nombre_criterio, setNombre_criterio] = useState("");
  const [porcentaje_criterio, setPorcentaje_criterio] = useState("");
  const [nombre_sub_criterio, setNombre_sub_criterio] = useState("");
  const [descripcion_sub_criterio, setDescripcion_sub_criterio] = useState("");
  const [nota_minima, setNota_minima] = useState("");
  const [nota_maxima, setNota_maxima] = useState("");
  const [id_criterio, setId_Criterio] = useState("");

  const guardarRegistros = () => {
    Axios.post("https://ingenieria.unac.edu.co/alertas-srv/Entrevista", {
      nota_sub_criterio_aspirante: nota_sub_criterio_aspirante,
      id_aspirante: id_aspirante,
    })
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong> Registro exitoso!!!</strong>",
          html: "<i>La entrevista está almacenada en la base de datos</i>",
          icon: "success",
          timer: 2500,
        }).then(() => {
          window.location.href = "/alertas/verAspirante";
        });
      })
      .catch((error) => {
        console.error("Error al agregar el aspirante:", error);
      });
  };

  const actualizarNota = (id_sub_criterio, nota_sub_criterio_aspirante) => {
    const notaNumerica =
      nota_sub_criterio_aspirante === "Nota"
        ? null
        : parseInt(nota_sub_criterio_aspirante, 10);

    if (!isNaN(notaNumerica)) {
      setNota_sub_criterio_aspirante((prevNotas) => ({
        ...prevNotas,
        [id_sub_criterio]: notaNumerica,
      }));
    } else {
      console.error(
        "La nota no es un número válido:",
        nota_sub_criterio_aspirante
      );
    }
  };

  const limpiarCampos = () => {
    setNota_sub_criterio_aspirante({});
  };

  useEffect(() => {
    getCriterios();
    getSub_criterios();
    checkEntrevistaRegistrada(id_aspirante);
  }, [id_aspirante]);

  const checkEntrevistaRegistrada = (id_aspirante) => {
    Axios.get(
      `https://ingenieria.unac.edu.co/alertas-srv/entrevista/${id_aspirante}`
    )
      .then((response) => {
        // Si existe un registro de entrevista para el estudiante, cargamos las notas
        if (response.data.length > 0) {
          const notas = response.data.reduce((accumulator, current) => {
            accumulator[current.id_sub_criterio] =
              current.nota_sub_criterio_aspirante;
            return accumulator;
          }, {});
          setNota_sub_criterio_aspirante(notas);
        }
      })
      .catch((error) => {
        console.error("Error al verificar la entrevista:", error);
      });
  };


  const openModal = (nombre_sub_criterio, descripcion_sub_criterio) => {
    setModalInfo({
      nombre_sub_criterio: nombre_sub_criterio,
      descripcion_sub_criterio: descripcion_sub_criterio,
    });
    setMostrarModal(true);
  };
  const openModalañadir = () => {
    setModalAñadir(true);
  };
  const openModalañadirsub = () => {
    setModalAñadirsub(true);
  };
  const cerrarModal1 = () => {
    setMostrarModal(false);
    setModalAñadir(false);
    setModalAñadirsub(false);
  };
  const getCriterios = () => {
    Axios.get("https://ingenieria.unac.edu.co/alertas-srv/criterios")
      .then((response) => {
        setCriterios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los criterios:", error);
      });
  };

  const getSub_criterios = () => {
    Axios.get("https://ingenieria.unac.edu.co/alertas-srv/sub_criterios")
      .then((response) => {
        setSub_criterios(response.data);
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
          `https://ingenieria.unac.edu.co/alertas-srv/deletecritero/${id_criterio}`
        )
          .then(() => {
            limpiarCampos();
            Swal.fire({
              icon: "success",
              title: "Criterio eliminado",
              showConfirmButton: false,
              timer: 1,
            }).then(() => {
              window.location.href = `/alertas/Entrevista/${id_aspirante}`;
            });
          })
          .catch((error) => {
            console.error("Error al eliminar el criterio:", error);
          });
      }
    });
  };
  const añadircriterio = () => {
    Axios.post("https://ingenieria.unac.edu.co/alertas-srv/createcriterio", {
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
          window.location.href = `/alertas/Entrevista/${id_aspirante}`;
        });
      })
      .catch((error) => {
        console.error("Error al agregar el aspirante:", error);
      });
  };
  const añadirsubcriterio = () => {
    Axios.post("https://ingenieria.unac.edu.co/alertas-srv/createsubcriterio", {
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
          window.location.href = `/alertas/Entrevista/${id_aspirante}`;
        });
      })
      .catch((error) => {
        console.error("Error al agregar el aspirante:", error);
      });
  };

  return (
    <div className="centrar-contenido">
      <Card className="card-personalizado" style={{ width: "70%" }}>
        <Card.Header
          style={{
            fontSize: "1.5em",
            fontFamily: "Roboto, Sans-serif",
            fontWeight: 600,
            color: "black",
          }}
        >
          <a
            href="/alertas/verAspirante"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Metropolis, Source Sans Pro, sans-serif",
            }}
          >
            <MDBIcon fas icon="arrow-alt-circle-left" size="2x" />
          </a>
          Entrevista de Admisión - {id_aspirante}
          <p
            className="px-3"
            style={{ color: "hsl(217, 10%, 50.8%)", fontSize: "18px" }}
          >
            Entrevista para realizar al aspirante en su proceso de admisión. La
            entrevista consta de algunos criterios y sub-criterios para asignar
            nota. El entrevistador, seleccionará la nota, dependiendo de las
            respuestas del aspirante. Puede que al seleccionar la nota 0 quede
            la palabra nota.
          </p>
        </Card.Header>
        <Card.Body>
          {criterios.map((criterio) => (
            <MDBCard key={criterio.id_criterio} className="mb-4">
              <MDBCardHeader
                className="titulo-criterio"
                style={{
                  color: "black",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#9289ca",
                  fontFamily: "Metropolis, Source Sans Pro, sans-serif",
                  borderColor: "#9289ca",
                }}
              >
                <span>{criterio.nombre_criterio}</span>
                <MDBBtn
                  color="danger"
                  onClick={() => deleteCriterio(criterio.id_criterio)}
                >
                  <MDBIcon fas icon="trash" />
                </MDBBtn>
              </MDBCardHeader>
              <MDBCardBody>
                <div>
                  {sub_criterios
                    .filter(
                      (sub_criterio) =>
                        sub_criterio.id_criterio === criterio.id_criterio
                    )
                    .map((sub_criterio) => (
                      <MDBInputGroup
                        className="mb-3"
                        key={sub_criterio.id_sub_criterio}
                      >
                        <Button
                          style={{
                            backgroundColor: "#ffcf6e",
                            width: "200px",
                            borderColor: "#ffcf6e",
                          }}
                          onClick={() =>
                            openModal(
                              sub_criterio.nombre_sub_criterio,
                              sub_criterio.descripcion_sub_criterio
                            )
                          }
                        >
                          {sub_criterio.nombre_sub_criterio}
                        </Button>

                        <select
                          style={{ borderColor: "#ffcf6e" }}
                          className="form-select"
                          value={
                            nota_sub_criterio_aspirante[
                              sub_criterio.id_sub_criterio
                            ] || ""
                          }
                          onChange={(event) =>
                            actualizarNota(
                              sub_criterio.id_sub_criterio,
                              event.target.value
                            )
                          }
                        >
                          <option value="" disabled>
                            Nota
                          </option>
                          {Array.from(
                            {
                              length:
                                sub_criterio.nota_maxima -
                                sub_criterio.nota_minima +
                                1,
                            },
                            (_, index) => (
                              <option
                                key={index}
                                value={index + sub_criterio.nota_minima}
                              >
                                {index + sub_criterio.nota_minima}
                              </option>
                            )
                          )}
                        </select>
                      </MDBInputGroup>
                    ))}
                </div>
              </MDBCardBody>
            </MDBCard>
          ))}
          <div className="Botones-añadir">
            <button
              className="botones-añadir"
              type="button"
              onClick={() => openModalañadir()}
            >
              <MDBIcon
                fas
                icon="plus-circle"
                size="2x"
                className="icono"
                style={{ marginRight: "5px" }}
              />
              <span>Criterio</span>
            </button>
            <button
              className="botones-añadir"
              type="button"
              onClick={() => openModalañadirsub()}
            >
              <MDBIcon
                fas
                icon="plus-circle"
                size="2x"
                className="icono"
                style={{ marginRight: "5px" }}
              />
              <span>Sub-Criterio</span>
            </button>
          </div>
        </Card.Body>
        <Card.Footer>
          <button
            className="boton-guardar-entrevista"
            onClick={guardarRegistros}
          >
            Guardar Entrevista <MDBIcon fas icon="check-circle" size="1x" />
          </button>
        </Card.Footer>
      </Card>
      <Modal isOpen={mostrarModal} className="custom-modal">
        <ModalHeader>{modalInfo.nombre_sub_criterio}</ModalHeader>
        <ModalBody>
          <div>{modalInfo.descripcion_sub_criterio}</div>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-danger" onClick={cerrarModal1}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalAñadir} className="custom-modal">
        <ModalHeader>AÑADE UN CRITERIO NUEVO</ModalHeader>
        <ModalBody>
          <div className="input-group mb-3 col-12 ">
            <span
              className="input-group-text "
              id="basic-addon1"
              style={{ backgroundColor: "#c28088", width: "150px" }}
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
              style={{ borderColor: "#c28088" }}
            />
          </div>
          <div className="input-group mb-3 ">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ backgroundColor: "#c28088" }}
            >
              Porcentaje Criterio:
            </span>
            <input
              type="text"
              value={porcentaje_criterio}
              onChange={(event) => setPorcentaje_criterio(event.target.value)}
              className="form-control h-150"
              placeholder="Escribe el porcentaje, solo el número"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderColor: "#c28088" }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <MDBBtn
            style={{
              borderColor: "#51c6ea",
              width: "10rem",
              height: "2.5rem",
              fontSize: "18px",
            }}
            onClick={añadircriterio}
          >
            Guardar Criterio
          </MDBBtn>
          <Button
            className="btn btn-danger"
            style={{ height: "2.5rem" }}
            onClick={cerrarModal1}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalAñadirsub} className="custom-modal">
        <ModalHeader>AÑADE UN CRITERIO NUEVO</ModalHeader>
        <ModalBody>
          <div className="input-group mb-3 col-12 ">
            <span
              className="input-group-text "
              id="basic-addon1"
              style={{ backgroundColor: "#00ca99", width: "200px" }}
            >
              Nombre Sub-Criterio:
            </span>
            <input
              type="text"
              value={nombre_sub_criterio}
              onChange={(event) => setNombre_sub_criterio(event.target.value)}
              className="form-control h-150"
              placeholder="Escribe el nombre del criterio"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderColor: "#00ca99" }}
            />
          </div>
          <div className="input-group mb-3 ">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ backgroundColor: "#00ca99", width: "200px" }}
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
              placeholder="Escribe el porcentaje, solo el número"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderColor: "#00ca99" }}
            />
          </div>
          <div className="input-group mb-3">
            <label
              className="input-group-text"
              htmlFor="inputState"
              style={{ backgroundColor: "#00ca99", width: "200px" }}
            >
              Criterio:
            </label>
            <select
              id="inputState"
              className="form-select"
              onChange={(event) => setId_Criterio(event.target.value)}
              style={{ borderColor: "#00ca99" }}
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
              style={{ backgroundColor: "#00ca99", width: "200px" }}
            >
              Nota minima:
            </span>
            <input
              type="text"
              value={nota_minima}
              onChange={(event) => setNota_minima(event.target.value)}
              className="form-control h-150"
              placeholder="Escribe el porcentaje, solo el número"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderColor: "#00ca99" }}
            />
          </div>
          <div className="input-group mb-3 ">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ backgroundColor: "#00ca99", width: "200px" }}
            >
              Porcentaje Criterio:
            </span>
            <input
              type="text"
              value={nota_maxima}
              onChange={(event) => setNota_maxima(event.target.value)}
              className="form-control h-150"
              placeholder="Escribe el porcentaje, solo el número"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderColor: "#00ca99" }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <MDBBtn
            style={{
              borderColor: "#51c6ea",
              width: "15rem",
              height: "2.5rem",
              fontSize: "18px",
            }}
            onClick={añadirsubcriterio}
          >
            Guardar Sub-criterio
          </MDBBtn>
          <Button
            className="btn btn-danger"
            style={{ height: "2.5rem" }}
            onClick={cerrarModal1}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Entrevista;