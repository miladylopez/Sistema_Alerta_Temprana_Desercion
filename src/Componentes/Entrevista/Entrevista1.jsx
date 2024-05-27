import Axios from "axios";
import {
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import "../Entrevista/Entrevista.css";

const Entrevista = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", content: "" });
  const [porcentajeDesercion, setPorcentajeDesercion] = useState(0); // Agregar estado para el porcentaje de deserción
  const { id_aspirante } = useParams();
  const [criterios, setCriterios] = useState([]);
  const [sub_criterios, setSub_criterios] = useState([]);
  const [nota_sub_criterio_aspirante, setNota_sub_criterio_aspirante] = useState({});

  
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
    "Otro",
    "Antioquia",
    "Arauca",
    "Cauca",
    "Caquetá",
    "Cesar",
    "Chocó",
    "Córdoba",
    "Magdalena",
    "Meta",
    "Nariño",
    "Norte de Santander",
    "Putumayo",
    "Santander",
    "Tolima",
    "Valle del Cauca",
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
      Departamento: departamentoOptions[0],
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

  const calcularPesoDepartamento = (departamento) => {
    return departamento === "Otro" ? 0 : 2;
  };

  const calcularProbabilidadDesercion = (notas, opciones) => {
    // Obtener los pesos de los subcriterios dinámicamente
    const pesos = {
      "Información básica": {
        Estrato: 6 - notas["Información básica"]["Estrato"],
        "Estado civil": opciones.estadoCivilOptions.find(
          (option) =>
            option.label === notas["Información básica"]["Estado civil"]
        ).value,
        Departamento: calcularPesoDepartamento(
          notas["Información básica"]["Departamento"]
        ),
        "Grupo especial de protección constitucional":
          opciones.grupoProteccionOptions.find(
            (option) =>
              option.label ===
              notas["Información básica"][
                "Grupo especial de protección constitucional"
              ]
          ).value,
        "Necesidad educativa": opciones.necesidadEducativaOptions.find(
          (option) =>
            option.label === notas["Información básica"]["Necesidad educativa"]
        ).value,
        "Validó bachillerato": opciones.validoBachilleratoOptions.find(
          (option) =>
            option.label === notas["Información básica"]["Validó bachillerato"]
        ).value,
        Discapacidad: opciones.discapacidadOptions.find(
          (option) =>
            option.label === notas["Información básica"]["Discapacidad"]
        ).value,
        "N personas a cargo": opciones.personasCargoOptions.find(
          (option) =>
            option.label === notas["Información básica"]["N personas a cargo"]
        ).value,
        EPS: opciones.epsOptions.find(
          (option) => option.label === notas["Información básica"]["EPS"]
        ).value,
        "Trabaja en ese periodo - Tipo trabajo": opciones.trabajaOptions.find(
          (option) =>
            option.label ===
            notas["Información básica"]["Trabaja en ese periodo - Tipo trabajo"]
        ).value,
      },
    };
  
    // Calcular el total del peso de los subcriterios
    const totalPeso = Object.values(pesos["Información básica"]).reduce(
      (a, b) => a + b,
      0
    );
  
    // Calcular el peso máximo total posible
    const maxPeso = calcularMaxPesoTotal(opciones); // Función a implementar para calcular los pesos máximos de todos los criterios
  
    // Calcular la probabilidad de deserción
    const probabilidadDesercion = (totalPeso / maxPeso) * 100;
  
    return probabilidadDesercion.toFixed(2);
  };
  
  const calcularMaxPesoTotal = (opciones) => {
    let maxPesoTotal = 0;
  
    // Iterar sobre los criterios
    criterios.forEach((criterio) => {
      // Obtener los subcriterios del criterio actual
      const subcriteriosCriterioActual = sub_criterios.filter(
        (subcriterio) => subcriterio.id_criterio === criterio.id_criterio
      );
  
      // Sumar los valores máximos de peso de los subcriterios
      subcriteriosCriterioActual.forEach((subcriterio) => {
        // Obtener las opciones del subcriterio actual
        const opcionesSubcriterio = opciones[subcriterio.nombre_sub_criterio + "Options"];
  
        // Obtener el valor máximo de peso del subcriterio actual
        const maxPesoSubcriterio = Math.max(...opcionesSubcriterio.map((opcion) => opcion.value));
  
        // Sumar al peso total
        maxPesoTotal += maxPesoSubcriterio;
      });
    });
  
    return maxPesoTotal;
  };
  
  
  



  const guardarRegistros = () => {
    const requests = Object.entries(nota_sub_criterio_aspirante).map(
        ([id_sub_criterio, nota_sub_criterio]) => {
            return Axios.get(`/entrevista/${id_aspirante}`)
                .then(response => {
                    const registroExistente = response.data.find(
                        registro => registro.id_sub_criterio === parseInt(id_sub_criterio)
                    );

                    if (registroExistente) {
                        // Actualizar registro existente
                        return Axios.put('/update_nota', {
                            nota_sub_criterio_aspirante: nota_sub_criterio,
                            id_sub_criterio: id_sub_criterio,
                            id_aspirante: id_aspirante,
                        });
                    } else {
                        // Crear nuevo registro
                        return Axios.post('/guardarEntrevista', {
                            nota_sub_criterio_aspirante: { [id_sub_criterio]: nota_sub_criterio },
                            id_aspirante: id_aspirante,
                        });
                    }
                });
        }
    );

    // Esperar a que todas las solicitudes se completen
    Promise.all(requests)
        .then(() => {
            setModalInfo({
                title: 'Éxito',
                content: 'Los registros se guardaron correctamente.'
            });
            setMostrarModal(true);
        })
        .catch(error => {
            console.error('Error al guardar los datos:', error);
            setModalInfo({
                title: 'Error',
                content: 'Hubo un error al intentar guardar los registros.'
            });
            setMostrarModal(true);
        });
};

  

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
      .then((response) => {})
      .catch((error) => {
        console.error("Error al obtener los datos del aspirante:", error);
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

  const getSub_criterios = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/sub_criterios`)
      .then((response) => {
        setSub_criterios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los sub criterios:", error);
      });
  };

  const openModal = (nombre_sub_criterio, descripcion_sub_criterio) => {
    setModalInfo({
      nombre_sub_criterio: nombre_sub_criterio,
      descripcion_sub_criterio: descripcion_sub_criterio,
    });
    setMostrarModal(true);
  };

  const closeModal = () => {
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
                    {/* Aquí puedes incluir el select si lo necesitas */}
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
                          ? departamentoOptions.map((option) => option.label)
                          : epsOptions.map((option) => option.label)
                        ).map((option, i) => (
                          <option key={i} value={option}>
                            {option}
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
                          ? estadoCivilOptions.map((option) => option.label)
                          : subcriterio ===
                            "Grupo especial de protección constitucional"
                          ? grupoProteccionOptions.map((option) => option.label)
                          : subcriterio === "Necesidad educativa"
                          ? necesidadEducativaOptions.map(
                              (option) => option.label
                            )
                          : subcriterio === "Validó bachillerato"
                          ? validoBachilleratoOptions.map(
                              (option) => option.label
                            )
                          : subcriterio === "Discapacidad"
                          ? discapacidadOptions.map((option) => option.label)
                          : subcriterio === "N personas a cargo"
                          ? personasCargoOptions.map((option) => option.label)
                          : trabajaOptions.map((option) => option.label)
                        ).map((option, i) => (
                          <option key={i} value={option}>
                            {option}
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

        {criterios.map((criterio) => (
          <Card.Body key={criterio.id_criterio}>
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
                        {generalOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  ))}
              </div>
            </MDBCardBody>
          </Card.Body>
        ))}
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
        <ModalHeader>{modalInfo.title}</ModalHeader>
        <ModalBody>
          <div>{modalInfo.content}</div>
          <div>Porcentaje de deserción: {porcentajeDesercion}%</div> 
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-danger" onClick={closeModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Entrevista;
