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
  const [nota_general, setNota_general] = useState(0);
  const [mostrarModalProbabilidad, setMostrarModalProbabilidad] =
    useState(false);
  const [probabilidadDesercion, setProbabilidadDesercion] = useState(0);

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

    if (criterio === "Información básica") {
      const nuevaNotaGeneral = calcularNotaGeneral({
        ...notas["Información básica"],
        [subcriterio]: value,
      });
      setNota_general(nuevaNotaGeneral);
    }
  };

  const obtenerIdAspiranteDinamicamente = () => {
    return parseInt(id_aspirante);
  };

  const calcularNotaGeneral = (subCriterios, idAspirante) => {
    const totalMax = 25;
    let sum = 0;

    for (const key in subCriterios) {
      if (subCriterios.hasOwnProperty(key)) {
        const value = subCriterios[key];

        sum += parseInt(value, 10);
      }
    }

    const porcentaje = (sum / totalMax) * 100;
    const notaGeneral = Math.min(porcentaje, 25);

    return notaGeneral;
  };

  const idAspirante = obtenerIdAspiranteDinamicamente();

  const notaGeneral = calcularNotaGeneral(
    notas["Información básica"],
    idAspirante
  );

  const guardarRegistros = () => {
    calcularProbabilidadDesercion();
    toggleModalProbabilidad();

    setTimeout(() => {
      const requests = Object.entries(nota_sub_criterio_aspirante).map(
        ([id_sub_criterio, nota_sub_criterio]) => {
          return Axios.get(
            `${process.env.REACT_APP_API_URL}/entrevista/${id_aspirante}`
          ).then((response) => {
            const registroExistente = response.data.find(
              (registro) =>
                registro.id_sub_criterio === parseInt(id_sub_criterio)
            );

            if (registroExistente) {
              return Axios.put(`${process.env.REACT_APP_API_URL}/update_nota`, {
                nota_sub_criterio_aspirante: nota_sub_criterio,
                id_sub_criterio: id_sub_criterio,
                id_aspirante: id_aspirante,
              });
            } else {
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
    }, 2000);
  };

  const actualizarNota = (id_sub_criterio, nota_sub_criterio_aspirante) => {
    const notaSeleccionada = parseInt(nota_sub_criterio_aspirante, 10);

    if (!isNaN(notaSeleccionada)) {
      const subcriterio = sub_criterios.find(
        (subcriterio) => subcriterio.id_sub_criterio === id_sub_criterio
      );

      let peso;
      if (notaSeleccionada === 0) {
        peso = subcriterio.nota_maxima;
      } else if (notaSeleccionada === 5) {
        peso = subcriterio.nota_minima;
      } else {
        const pesoMaximo = subcriterio.nota_maxima;
        const pesoMinimo = subcriterio.nota_minima;
        const rango = 5;

        peso =
          pesoMinimo +
          ((pesoMaximo - pesoMinimo) / (rango - 1)) * notaSeleccionada;
      }

      setNota_sub_criterio_aspirante((prevNotas) => ({
        ...prevNotas,
        [id_sub_criterio]: notaSeleccionada,
      }));
    } else {
    }
  };

  const limpiarCampos = () => {
    setCriterios([]);
    setSub_criterios([]);
    setNota_sub_criterio_aspirante({});
  };

  useEffect(() => {
    getCriterios();
    getSub_criterios();
    getAspirantes(id_aspirante);
    checkEntrevistaRegistrada(id_aspirante);
  }, [id_aspirante]);

  const checkEntrevistaRegistrada = (id_aspirante) => {
    const alertaMostrada = localStorage.getItem(
      `alertaEntrevista-${id_aspirante}`
    );
    if (alertaMostrada) {
      return;
    }

    Axios.get(`${process.env.REACT_APP_API_URL}/entrevista/${id_aspirante}`)
      .then((response) => {
        if (response.data.length > 0) {
          Swal.fire({
            title: "<strong>Entrevista ya registrada</strong>",
            html: "<i>Ya existe una entrevista registrada para este aspirante.</i>",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Ver entrevista",
            cancelButtonText: "Salir",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/alertas/entrevista/${id_aspirante}`;
            } else {
              window.location.href = `/alertas/verAspirante`;
            }
          });

          localStorage.setItem(`alertaEntrevista-${id_aspirante}`, true);
        } else {
        }
      })
      .catch((error) => {});
  };

  const getCriterios = async () => {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_URL}/criterios`
    );
    console.log(response.data);
    setCriterios(response.data);
  };

  const getSub_criterios = async () => {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_URL}/sub_criterios`
    );
    setSub_criterios(response.data);
  };

  const getAspirantes = (id_aspirante) => {
    Axios.get(`${process.env.REACT_APP_API_URL}/aspirantes/${id_aspirante}`)
      .then((response) => {})
      .catch((error) => {});
  };

  useEffect(() => {
    const fetchCriterios = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/criterios`
      );
      setCriterios(response.data);
    };

    const fetchSubCriterios = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/sub_criterios`
      );
      setSub_criterios(response.data);
    };

    fetchCriterios();
    fetchSubCriterios();
  }, []);

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

  const toggleModal = () => setMostrarModal(!mostrarModal);

  const toggleModalProbabilidad = () => {
    setMostrarModalProbabilidad(!mostrarModalProbabilidad);
    if (!mostrarModalProbabilidad) {
    }
  };

  const probabilidades = {
    Estrato: {
      1: 0.3,
      2: 0.2,
      3: 0.1,
      4: 0.0,
      5: 0.0,
      6: 0.0,
    },
    "Estado civil": {
      0: 0.0,
      1: 0.1,
      2: 0.2,
    },
    Departamento: {
      0: 0.0,
      1: 0.2,
    },
    "Grupo especial de protección constitucional": {
      0: 0.0,
      1: 0.1,
      2: 0.1,
      3: 0.2,
    },
    "Necesidad educativa": {
      0: 0.0,
      1: 0.1,
      2: 0.2,
    },
    "Validó bachillerato": {
      0: 0.0,
      2: 0.2,
    },
    Discapacidad: {
      0: 0.0,
      1: 0.1,
      2: 0.2,
      3: 0.3,
    },
    "N personas a cargo": {
      0: 0.0,
      1: 0.1,
      2: 0.2,
      3: 0.3,
    },
    EPS: {
      0: 0.0,
      2: 0.2,
    },
    "Trabaja en ese periodo - Tipo trabajo": {
      1: 0.3,
      2: 0.0,
    },
  };

  const calcularProbabilidadDesercion = () => {
    let informacionBasica = 0;
    let totalCriterios = 0;
    const valoresPorCriterio = {};

    // Calcula la probabilidad de deserción para la sección "Información básica"
    for (const subcriterio in notas["Información básica"]) {
        const valorSeleccionado = notas["Información básica"][subcriterio];
        informacionBasica += 0.25 * probabilidades[subcriterio][valorSeleccionado];
    }

    // Acumula los valores de los subcriterios por criterio con las condiciones especiales
    for (const subcriterio of sub_criterios) {
        const criterioCorrespondiente = criterios.find(
            (criterio) => criterio.id_criterio === subcriterio.id_criterio
        );

        // Verifica si criterioCorrespondiente es undefined
        if (!criterioCorrespondiente) {
            console.error(`Criterio no encontrado para subcriterio: ${subcriterio.id_sub_criterio}`);
            continue;
        }

        const idSubCriterio = subcriterio.id_sub_criterio;
        const valorSeleccionado = nota_sub_criterio_aspirante[idSubCriterio];

        let valorAUsar;
        if (valorSeleccionado === 5) {
            valorAUsar = subcriterio.nota_minima;
        } else if (valorSeleccionado === 0) {
            valorAUsar = subcriterio.nota_maxima;
        } else {
            valorAUsar = (subcriterio.nota_minima + subcriterio.nota_maxima) / 2;
        }

        const valorTotalCriterio = valoresPorCriterio[criterioCorrespondiente.nombre_criterio] || 0;
        valoresPorCriterio[criterioCorrespondiente.nombre_criterio] = valorTotalCriterio + valorAUsar;
    }

    // Calcula la probabilidad de deserción para cada criterio
    for (const criterio in valoresPorCriterio) {
        const valorTotalCriterio = valoresPorCriterio[criterio];
        const criterioEncontrado = criterios.find((c) => c.nombre_criterio === criterio);

        if (!criterioEncontrado) {
            console.error(`Criterio no encontrado para nombre_criterio: ${criterio}`);
            continue;
        }

        const porcentajeCriterio = criterioEncontrado.porcentaje_criterio;
        const porcentajeAjustado = porcentajeCriterio / 100;
        const valorPorcentaje = (valorTotalCriterio * porcentajeAjustado * 0.75) / 100;
        totalCriterios += valorPorcentaje;
    }

    // Calcula la probabilidad total de deserción
    const probabilidadTotal = totalCriterios + informacionBasica;

    // Ajusta la probabilidad total para que no exceda el 100%
    const probabilidadTotalAjustada = Math.min(probabilidadTotal, 1);

    // Establece la probabilidad de deserción en el estado
    setProbabilidadDesercion(probabilidadTotalAjustada * 100);

    // Guarda la probabilidad de deserción del aspirante
    saveDesertionByApplicant();
};


const saveDesertionByApplicant = () => {
  const data = {
    id_aspirante: id_aspirante,
    probabilidad: probabilidadDesercion,
  };

  console.log('Datos enviados:', data);  // Para verificar los datos

  axios
    .post(`${process.env.REACT_APP_API_URL}/guarda_porcentaje`, data)
    .then((response) => {
      console.log('Respuesta del servidor:', response.data);
    })
    .catch((error) => {
      console.log('Error al guardar los datos:', error);
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
              marginBottom: "10px",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>Información Básica</span>{" "}
            {/* Ajusta el tamaño de la fuente */}
          </MDBCardHeader>
          <MDBCardBody>
            <div>
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
                <MDBInputGroup className="mb-3" key={index}>
                  <Button
                    style={{
                      backgroundColor: "#ffcf6e",
                      width: "200px",
                      borderColor: "#ffcf6e",
                      color: "black",
                    }}
                  >
                    {subcriterio}
                  </Button>
                  <select
                    style={{ borderColor: "#ffcf6e" }}
                    className="form-select"
                    value={notas["Información básica"][subcriterio] || ""}
                    onChange={(e) =>
                      handleNotaChange(
                        "Información básica",
                        subcriterio,
                        e.target.value
                      )
                    }
                  >
                    <option value="">Probabilidad</option>
                    {(subcriterio === "Departamento"
                      ? departamentoOptions
                      : subcriterio === "EPS"
                      ? epsOptions
                      : subcriterio === "Estrato"
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
                </MDBInputGroup>
              ))}
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
                            ] !== undefined &&
                            nota_sub_criterio_aspirante[
                              sub_criterio.id_sub_criterio
                            ] !== null
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
                          <option value="">Probabilidad</option>
                          {generalOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
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
      <Modal isOpen={mostrarModalProbabilidad} toggle={toggleModalProbabilidad}>
        <ModalHeader toggle={toggleModalProbabilidad}>
          Probabilidad de Deserción
        </ModalHeader>
        <ModalBody>
          <h4>Probabilidad de Deserción: {probabilidadDesercion}%</h4>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-danger" onClick={toggleModalProbabilidad}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Entrevista;
