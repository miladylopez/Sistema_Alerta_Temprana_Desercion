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
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

const Entrevista = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", content: "" });
  const { id_aspirante } = useParams();
  const [criterios, setCriterios] = useState([]);
  const [sub_criterios, setSub_criterios] = useState([]);
  const [nota_sub_criterio_aspirante, setNota_sub_criterio_aspirante] =
    useState({});

  const guardarRegistros = () => {
    const requests = Object.entries(nota_sub_criterio_aspirante).map(
      ([id_sub_criterio, nota_sub_criterio]) => {
        return Axios.get(
          `${process.env.REACT_APP_API_URL}/entrevista/${id_aspirante}`
        ).then((response) => {
          const registroExistente = response.data.find(
            (registro) => registro.id_sub_criterio === parseInt(id_sub_criterio)
          );
  
          if (registroExistente) {
            // Actualizar registro existente
            return Axios.put(
              `${process.env.REACT_APP_API_URL}/update_nota`,
              {
                nota_sub_criterio_aspirante: nota_sub_criterio,
                id_sub_criterio: id_sub_criterio,
                id_aspirante: id_aspirante,
              }
            );
          } else {
            // Crear nuevo registro
            return Axios.post(`${process.env.REACT_APP_API_URL}/Entrevista`, {
              nota_sub_criterio_aspirante: { [id_sub_criterio]: nota_sub_criterio },
              id_aspirante: id_aspirante,
            });
          }
        });
      }
    );
  
    Promise.all(requests)
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso!!!</strong>",
          html: "<i>La entrevista está almacenada en la base de datos</i>",
          icon: "success",
          timer: 2500,
        }).then(() => {
          (window.location.href = `/alertas/entrevista/${id_aspirante}`);
        });
      })
      .catch((error) => {
        console.error("Error al guardar los registros:", error);
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
    getAspirantes(id_aspirante);
    checkEntrevistaRegistrada(id_aspirante);
  }, [id_aspirante]);

  const checkEntrevistaRegistrada = (id_aspirante) => {
    Axios.get(`${process.env.REACT_APP_API_URL}/entrevista/${id_aspirante}`)
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

  const getAspirantes = (id_aspirante) => {
    Axios.get(`${process.env.REACT_APP_API_URL}/aspirantes/${id_aspirante}`)
      .then((response) => {
      })
      .catch((error) => {
        console.error("Error al obtener los datos del aspirante:", error);
      });
  };

  const openModal = (nombre_sub_criterio, descripcion_sub_criterio) => {
    setModalInfo({
      nombre_sub_criterio: nombre_sub_criterio,
      descripcion_sub_criterio: descripcion_sub_criterio,
    });
    setMostrarModal(true);
  };

  const cerrarModal1 = () => {
    setMostrarModal(false);
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

  const getSub_criterios = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/sub_criterios`)
      .then((response) => {
        setSub_criterios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los criterios:", error);
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
            entrevista consta de algunos criterios y subcriterios para asignar
            una nota. Como se trata de probabilidad relacione en el rango estipulado para cada sub-criterio la probabilidad
            de que el aspirante deserte en cada sub-criterio .
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
                            color: "black"
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
                            ] !== undefined
                              ? nota_sub_criterio_aspirante[
                                  sub_criterio.id_sub_criterio
                                ]
                              : ""
                          }
                          onChange={(event) =>
                            actualizarNota(
                              sub_criterio.id_sub_criterio,
                              event.target.value
                            )
                          }
                        >
                          <option value="" disabled>
                            Probabilidad
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
    </div>
  );
};

export default Entrevista;