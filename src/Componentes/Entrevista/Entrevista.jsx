import { default as Axios, default as axios } from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { default as React, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import "../Entrevista/Entrevista.css";

const Entrevista = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", content: "" });
  const { id_aspirante } = useParams();
  const [criterios, setCriterios] = useState([]);
  const [sub_criterios, setSub_criterios] = useState([]);
  const [nota_sub_criterio_aspirante, setNota_sub_criterio_aspirante] =
    useState({});

  // SubCriterios Información básica
  const estratoOptions = [1, 2, 3, 4, 5, 6];
  const estadoCivilOptions = [
    { label: "Soltero", value: 0 },
    { label: "Casado", value: 2 },
    { label: "Unión Libre", value: 1 },
    { label: "Divorciado", value: 2 },
    { label: "Viudo", value: 1 },
  ];

  const departamentoOptions = [
    { label: "Otro", value: 0 },
    { label: "Antioquia", value: 1 },
    { label: "Arauca", value: 1 },
    { label: "Cauca", value: 1 },
    { label: "Caquetá", value: 1 },
    { label: "Cesar", value: 1 },
    { label: "Chocó", value: 1 },
    { label: "Córdoba", value: 1 },
    { label: "Magdalena", value: 1 },
    { label: "Meta", value: 1 },
    { label: "Nariño", value: 1 },
    { label: "Norte de Santander", value: 1 },
    { label: "Putumayo", value: 1 },
    { label: "Santander", value: 1 },
    { label: "Tolima", value: 1 },
    { label: "Valle del Cauca", value: 1 },
  ];

  const grupoProteccionOptions = [
    { label: "Ninguno", value: 0 },
    { label: "Indígena", value: 3 },
    { label: "Afrodescendiente", value: 2 },
    { label: "Raizal", value: 2 },
    { label: "ROM", value: 1 },
    { label: "Palenquero", value: 2 },
    { label: "Víctima del conflicto", value: 3 },
  ];
  const necesidadEducativaOptions = [
    { label: "Ninguna", value: 0 },
    { label: "Apoyo pedagógico", value: 1 },
    { label: "Material adaptado", value: 2 },
    { label: "Intérprete de señas", value: 2 },
  ];
  const validoBachilleratoOptions = [
    { label: "Sí", value: 2 },
    { label: "No", value: 0 },
  ];
  const discapacidadOptions = [
    { label: "Ninguna", value: 0 },
    { label: "Física", value: 1 },
    { label: "Sensorial", value: 2 },
    { label: "Cognitiva", value: 2 },
    { label: "Psicosocial", value: 3 },
    { label: "Múltiple", value: 3 },
  ];
  const personasCargoOptions = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3+", value: 3 },
  ];
  const epsOptions = [
    { label: "Sí", value: 0 },
    { label: "No", value: 2 },
  ];
  const trabajaOptions = [
    { label: "Sí", value: 1 },
    { label: "No", value: 2 },
  ];
  const generalOptions = [0, 1, 2, 3, 4, 5];

  const [notas, setNotas] = useState({
    "Información básica": {
      Estrato: estratoOptions[0],
      "Estado civil": estadoCivilOptions[0].label,
      Departamento: departamentoOptions[0].label,
      "Grupo especial de protección constitucional":
        grupoProteccionOptions[0].label,
      "Necesidad educativa": necesidadEducativaOptions[0].label,
      "Validó bachillerato": validoBachilleratoOptions[0].label,
      Discapacidad: discapacidadOptions[0].label,
      "N personas a cargo": personasCargoOptions[0].label,
      EPS: epsOptions[0].label,
      "Trabaja en ese periodo - Tipo trabajo": trabajaOptions[0].label,
    },
  });

  const handleNotaChange = (criterio, subcriterio, value) => {
    setNotas((prevNotas) => ({
      ...prevNotas,
      [criterio]: {
        ...prevNotas[criterio],
        [subcriterio]: value,
      },
    }));
  };

  const notaGeneral = notas["Información básica"]["nota_general"];

  // Realiza una única solicitud POST al servidor enviando solo la nota general
  axios
    .post(`${process.env.REACT_APP_API_URL}/informacion_basica`, {
      id_aspirante: id_aspirante,
      nota_general: notaGeneral,
    })
    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
    })
    .catch((error) => {
      console.error("Error al enviar los datos al servidor:", error);
    });

  // Verifica si el id_aspirante existe en el servidor
  axios
    .get(`${process.env.REACT_APP_API_URL}/informacion_basica/${id_aspirante}`)
    .then((response) => {
      const existingRecord = response.data[0];

      // Si el registro existe, actualiza la nota_general
      if (existingRecord) {
        const notaGeneral = notas["Información básica"]["nota_general"];

        axios
          .post(`${process.env.REACT_APP_API_URL}/informacion_basica`, {
            id_aspirante: id_aspirante,
            nota_general: notaGeneral,
          })
          .then((response) => {
            console.log("Respuesta del servidor:", response.data);
          })
          .catch((error) => {
            console.error("Error al enviar los datos al servidor:", error);
          });
      } else {
        // Si el registro no existe, puedes mostrar un mensaje o realizar otra acción
        console.log("El id_aspirante no existe en el servidor.");
      }
    })
    .catch((error) => {
      console.error(
        "Error al verificar el id_aspirante en el servidor:",
        error
      );
    });

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
            return Axios.put(`${process.env.REACT_APP_API_URL}/update_nota`, {
              nota_sub_criterio_aspirante: nota_sub_criterio,
              id_sub_criterio: id_sub_criterio,
              id_aspirante: id_aspirante,
            });
          } else {
            // Crear nuevo registro
            return Axios.post(`${process.env.REACT_APP_API_URL}/Entrevista`, {
              nota_sub_criterio_aspirante: {
                [id_sub_criterio]: nota_sub_criterio,
              },
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
          window.location.href = `/alertas/entrevista/${id_aspirante}`;
        });
      })
      .catch((error) => {
        console.error("Error al guardar los registros:", error);
      });
  };

  // Actualizar el valor seleccionado del select
  const handleSelectChange = (criterio, subcriterio, value) => {
    // Actualizar el estado con el valor seleccionado
    setNotas((prevNotas) => ({
      ...prevNotas,
      [criterio]: {
        ...prevNotas[criterio],
        [subcriterio]: value,
      },
    }));
  };

  // Declaración de la función convertirValorSeleccionado
  const convertirValorSeleccionado = (
    valorSeleccionado,
    notaMinima,
    notaMaxima
  ) => {
    let rango = notaMaxima - notaMinima;
    let nota = notaMaxima - valorSeleccionado * (rango / 5);
    return nota;
  };

  
  

  // Función para actualizar las notas del subcriterio
  const actualizarNota = (id_sub_criterio, nota_sub_criterio_aspirante) => {
    const notaSeleccionada = parseInt(nota_sub_criterio_aspirante, 10);

    if (!isNaN(notaSeleccionada)) {
      const subcriterio = sub_criterios.find(
        (subcriterio) => subcriterio.id_sub_criterio === id_sub_criterio
      );

      let peso;
      if (notaSeleccionada === 0) {
        peso = subcriterio.nota_maxima; // Tomar nota_maxima cuando se selecciona 0
      } else if (notaSeleccionada === 5) {
        peso = subcriterio.nota_minima; // Tomar nota_minima cuando se selecciona 5
      } else {
        // Calcular el peso en base a la selección del select
        const pesoMaximo = subcriterio.nota_maxima;
        const pesoMinimo = subcriterio.nota_minima;
        const rango = 5; // Rango del select
        // Calcular el peso en base a la selección dentro del rango
        peso =
          pesoMinimo +
          ((pesoMaximo - pesoMinimo) / (rango - 1)) * notaSeleccionada;
      }

      setNota_sub_criterio_aspirante((prevNotas) => ({
        ...prevNotas,
        [id_sub_criterio]: notaSeleccionada, // Almacenar la nota seleccionada en el estado
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
    // Verificar si la alerta ya ha sido mostrada para este aspirante
    const alertaMostrada = localStorage.getItem(
      `alertaEntrevista-${id_aspirante}`
    );
    if (alertaMostrada) {
      return; // Si la alerta ya ha sido mostrada, no hacer nada
    }

    Axios.get(`${process.env.REACT_APP_API_URL}/entrevista/${id_aspirante}`)
      .then((response) => {
        if (response.data.length > 0) {
          // Mostrar alerta de que ya hay una entrevista registrada
          Swal.fire({
            title: "<strong>Entrevista ya registrada</strong>",
            html: "<i>Ya existe una entrevista registrada para este aspirante.</i>",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Ver entrevista",
            cancelButtonText: "Salir",
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir a la página de edición de entrevista
              window.location.href = `/alertas/entrevista/${id_aspirante}`;
            } else {
              // Redirigir a la página de lista de aspirantes
              window.location.href = `/alertas/verAspirante`;
            }
          });

          // Guardar indicador de que la alerta ha sido mostrada
          localStorage.setItem(`alertaEntrevista-${id_aspirante}`, true);
        } else {
          // Si no hay entrevista registrada, puedes agregar lógica adicional aquí
        }
      })
      .catch((error) => {
        console.error("Error al verificar entrevista registrada:", error);
      });
  };

  const getCriterios = async () => {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_URL}/criterios`
    );
    setCriterios(response.data);
  };

  const getSub_criterios = async () => {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_URL}/sub_criterios`
    );
    setSub_criterios(response.data);
  };

  const getAspirantes = async (id_aspirante) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/aspirantes/${id_aspirante}`
      );
      const aspirante = response.data[0];

      if (aspirante) {
        setNotas({
          ...notas,
          "Información básica": {
            ...notas["Información básica"],
            Estrato: estratoOptions[aspirante.Estrato - 1] || estratoOptions[0],
            "Estado civil":
              estadoCivilOptions.find(
                (option) => option.value === aspirante["Estado civil"]
              )?.label || estadoCivilOptions[0].label,
            Departamento: aspirante.Departamento || departamentoOptions[0],
            "Grupo especial de protección constitucional":
              grupoProteccionOptions.find(
                (option) =>
                  option.value ===
                  aspirante["Grupo especial de protección constitucional"]
              )?.label || grupoProteccionOptions[0].label,
            "Necesidad educativa":
              necesidadEducativaOptions.find(
                (option) => option.value === aspirante["Necesidad educativa"]
              )?.label || necesidadEducativaOptions[0].label,
            "Validó bachillerato":
              validoBachilleratoOptions.find(
                (option) => option.value === aspirante["Validó bachillerato"]
              )?.label || validoBachilleratoOptions[0].label,
            Discapacidad:
              discapacidadOptions.find(
                (option) => option.value === aspirante.Discapacidad
              )?.label || discapacidadOptions[0].label,
            "N personas a cargo":
              personasCargoOptions.find(
                (option) => option.value === aspirante["N personas a cargo"]
              )?.label || personasCargoOptions[0].label,
            EPS:
              epsOptions.find((option) => option.value === aspirante.EPS)
                ?.label || epsOptions[0].label,
            "Trabaja en ese periodo - Tipo trabajo":
              trabajaOptions.find(
                (option) =>
                  option.value ===
                  aspirante["Trabaja en ese periodo - Tipo trabajo"]
              )?.label || trabajaOptions[0].label,
          },
        });
      } else {
        console.error("No se encontró el aspirante con el ID proporcionado.");
      }
    } catch (error) {
      console.error("Error al obtener los datos del aspirante:", error);
    }
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
            un porcentaje. Tenga en cuenta que esto es probabilidad: relacione,
            para cada subcriterio en el rango designado, la probabilidad de
            deserción por cada sub-criterio.
          </p>
        </Card.Header>
        <Card.Body>
          <MDBCardHeader
            className="titulo-criterio d-flex justify-content-between"
            style={{
              color: "black",
              backgroundColor: "#9289ca",
              fontFamily: "Metropolis, Source Sans Pro, sans-serif",
              borderColor: "#9289ca",
              marginBottom: "10px", // Agrega un poco de espacio inferior
            }}
          >
            <span style={{ fontSize: "1rem" }}>Información básica</span>{" "}
            {/* Ajusta el tamaño de la fuente */}
          </MDBCardHeader>
          <MDBCardBody>
            <div>
              <MDBInputGroup className="mb-3">
                {[
                  "Estrato",
                  "Estado civil",
                  "Departamento",
                  "Grupo especial de protección constitucional",
                  "Necesidad educativa",
                  "Validó bachillerato",
                  "Discapacidad",
                  "N personas a cargo",
                  "EPS",
                  "Trabaja en ese periodo - Tipo trabajo",
                ].map((subcriterio, index) => (
                  <div key={index} className="form-group">
                    <Button
                      style={{
                        backgroundColor: "#ffcf6e",
                        width: "200px",
                        borderColor: "#ffcf6e",
                        color: "black",
                        marginBottom: "10px", // Añade espacio entre los botones
                      }}
                    >
                      {subcriterio}
                    </Button>
                    {subcriterio === "Departamento" || subcriterio === "EPS" ? (
                      <select
                        style={{ borderColor: "#ffcf6e" }}
                        className="form-select mb-3" // Añade espacio inferior
                        value={notas["Información básica"][subcriterio]}
                        onChange={(e) =>
                          handleNotaChange(
                            "Información básica",
                            subcriterio,
                            e.target.value
                          )
                        }
                      >
                        <option value="" disabled>
                          Probabilidad
                        </option>
                        {(subcriterio === "Departamento"
                          ? departamentoOptions
                          : epsOptions
                        ).map((option, i) => (
                          <option key={i} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        style={{ borderColor: "#ffcf6e" }}
                        className="form-select mb-3" // Añade espacio inferior
                        value={notas["Información básica"][subcriterio]}
                        onChange={(e) =>
                          handleNotaChange(
                            "Información básica",
                            subcriterio,
                            e.target.value
                          )
                        }
                      >
                        <option value="" disabled>
                          Probabilidad
                        </option>
                        {(subcriterio === "Estrato"
                          ? estratoOptions
                          : subcriterio === "Estado civil"
                          ? estadoCivilOptions
                          : subcriterio ===
                            "Grupo especial de protección constitucional"
                          ? grupoProteccionOptions
                          : subcriterio === "Necesidad educativa"
                          ? necesidadEducativaOptions
                          : subcriterio === "Validó bachillerato"
                          ? validoBachilleratoOptions
                          : subcriterio === "Discapacidad"
                          ? discapacidadOptions
                          : subcriterio === "N personas a cargo"
                          ? personasCargoOptions
                          : trabajaOptions
                        ).map((option, i) => (
                          <option key={i} value={option.value}>
                            {option.label || option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </MDBInputGroup>
            </div>
          </MDBCardBody>
        </Card.Body>
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
                            color: "black",
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
                            ] || "" // Asegúrate de que el valor predeterminado sea una cadena vacía si no hay un valor asignado
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
                          {Array.from({ length: 6 }, (_, index) => (
                            <option key={index} value={index.toString()}>
                              {index}
                            </option>
                          ))}
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
