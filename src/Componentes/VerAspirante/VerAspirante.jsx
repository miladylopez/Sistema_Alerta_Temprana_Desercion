import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { FaPercentage } from "react-icons/fa";
import { MDBIcon } from "mdb-react-ui-kit";

const Inicio = () => {
  const [aspirantesList, setAspirantes] = useState([]);
  const [tablaaspirantes, setTablaaspirantes] = useState([]);
  const [filtroPrograma, setFiltroPrograma] = useState("");
  const [filtroPeriodo, setFiltroPeriodo] = useState("");
  const [nombre_aspirante, setNombre] = useState("");
  const [codigo_carnet, setCodigoCarnet] = useState("");
  const [email_aspirante, setEmail] = useState("");
  const [telefono_aspirante, setTelefono] = useState("");
  const [id_aspirante, setId_aspirante] = useState("");
  const [nombre_entrevistador, setNombre_entrevistador] = useState("");
  const [id_entrevistador, setId_entrevistador] = useState("");
  const [entrevistador, setEntrevistador] = useState([]);
  const [id_periodo, setIdPeriodo] = useState([]);
  const [periodo, setPeriodo] = useState("");
  const [periodos, setperiodos] = useState([]);
  const [id_programa, setid_programa] = useState("");
  const [programa, setPrograma] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [modalActualizar, setModalActualizar] = useState(false);
  const sumarNotas = (subcriterios) => {
    return subcriterios.reduce((total, subcriterio) => {
      return total + subcriterio.nota_sub_criterio_aspirante;
    }, 0);
  };

  const getNotas_SubCriterios = (id_aspirante) => {
    Axios.get(
      "https://ingenieria.unac.edu.co/alertas-srv/sub_criterios-notas",
      {
        params: {
          id_aspirante: id_aspirante,
        },
      }
    )
      .then((response) => {
        console.log("Notas y subcriterios obtenidos:", response.data);
        if (response.data.length === 0) {
          // Mostrar alerta si no hay datos
          Swal.fire({
            icon: "info",
            title:
              "No hay datos para calcular. Por favor, diligencia la entrevista.",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          // Filtrar subcriterios por grupo
          const subcriterios = response.data;
          const grupo1 = subcriterios.filter(
            (item) => item.id_sub_criterio >= 12 && item.id_sub_criterio <= 21
          );
          const grupo2 = subcriterios.filter(
            (item) => item.id_sub_criterio === 1 || item.id_sub_criterio === 2
          );
          const grupo3 = subcriterios.filter(
            (item) => item.id_sub_criterio >= 3 && item.id_sub_criterio <= 5
          );
          const grupo4 = subcriterios.filter(
            (item) => item.id_sub_criterio >= 6 && item.id_sub_criterio <= 8
          );
          const grupo5 = subcriterios.filter(
            (item) => item.id_sub_criterio >= 9 && item.id_sub_criterio <= 11
          );

          const porcentajesCriterios = {};

          // Obtener los porcentajes de cada criterio
          Axios.get("https://ingenieria.unac.edu.co/alertas-srv/criterios")
            .then((response) => {
              response.data.forEach((criterio) => {
                porcentajesCriterios[criterio.id_criterio] =
                  criterio.porcentaje_criterio;
              });

              // Calcular la fórmula
              const resultado =
                (sumarNotas(grupo1) / porcentajesCriterios[1]) *
                  porcentajesCriterios[1] +
                (sumarNotas(grupo2) / porcentajesCriterios[2]) *
                  porcentajesCriterios[2] +
                (sumarNotas(grupo3) / porcentajesCriterios[3]) *
                  porcentajesCriterios[3] +
                (sumarNotas(grupo4) / porcentajesCriterios[4]) *
                  porcentajesCriterios[4] +
                (sumarNotas(grupo5) / porcentajesCriterios[5]) *
                  porcentajesCriterios[5];

              // Mostrar resultado en un Swal
              let icono;
              if (resultado >= 0 && resultado <= 30) {
                icono = "success";
              } else if (resultado > 30 && resultado <= 70) {
                icono = "warning";
              } else {
                icono = "error";
              }
              Swal.fire({
                icon: icono,
                title: "El porcentaje de probabilidad de deserción es:",
                text: `${resultado}%`,
                confirmButtonText: "Cerrar",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  // Llamada a la función para obtener el porcentaje
                  getPorcentaje_Probabilidad(id_aspirante)
                    .then((response) => {
                      console.log("porcentaje obtenido:", response.data);
                      if (response.data.length === 0) {
                        // Si no hay porcentaje para el id_aspirante, guardarlo
                        guardar_porcentaje(resultado, id_aspirante);
                        console.log("resultado, id", response.data);
                      } else {
                        // Si hay porcentaje para el id_aspirante, actualizarlo
                        Editar_porcentaje(resultado, id_aspirante);
                        console.log("porcentaje editado", response.data);
                      }
                    })
                    .catch((error) => {
                      console.error("Error al obtener el porcentaje:", error);
                    });
                }
              });
            })
            .catch((error) => {
              console.error("Error al obtener los criterios:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error al obtener las notas y subcriterios:", error);
      });
  };

  const guardar_porcentaje = (resultado, id_aspirante) => {
    Axios.post("https://ingenieria.unac.edu.co/alertas-srv/guarda_porcentaje", {
      porcentaje_probabilidad: resultado,
      id_aspirante: id_aspirante,
    })
      .then(() => {
        limpiarCampos();
      })
      .catch((error) => {
        console.error("Error al agregar el guardar porcentaje:", error);
      });
  };

  const getPorcentaje_Probabilidad = (id_aspirante) => {
    return Axios.get(
      "https://ingenieria.unac.edu.co/alertas-srv/obtener_porcentaje",
      {
        params: {
          id_aspirante: id_aspirante,
        },
      }
    );
  };

  const Editar_porcentaje = (resultado, id_aspirante) => {
    Axios.put("https://ingenieria.unac.edu.co/alertas-srv/update_Porcentaje", {
      porcentaje_probabilidad: resultado,
      id_aspirante: id_aspirante,
    })
      .then((response) => {
        console.log("Porcentaje actualizado con éxito:", response.data);
      })
      .catch((error) => {
        console.error("Error al actualizar el porcentaje:", error);
      });
  };

  const mostrarModalActualizar = (val) => {
    setNombre(val.nombre_aspirante);
    setCodigoCarnet(val.codigo_carnet);
    setEmail(val.email_aspirante);
    setTelefono(val.telefono_aspirante);
    setId_aspirante(val.id_aspirante);
    setNombre_entrevistador(val.nombre_entrevistador);
    setPeriodo(val.periodo);
    setIdPeriodo(val.id_periodo);
    setId_entrevistador(val.id_entrevistador);
    setPrograma(val.nombre_programa);
    setid_programa(val.id_programa);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const update = () => {
    Axios.put("https://ingenieria.unac.edu.co/alertas-srv/update", {
      id_aspirante: id_aspirante,
      nombre_aspirante: nombre_aspirante,
      codigo_carnet: codigo_carnet,
      email_aspirante: email_aspirante,
      telefono_aspirante: telefono_aspirante,
      id_entrevistador: id_entrevistador,
      id_periodo: id_periodo,
      id_programa: id_programa,
    }).then(() => {
      getAspirantes();
      limpiarCampos();
      Swal.fire({
        title: "<strong> Actualizacion exitosa!!!</strong>",
        html:
          "<i>El aspirante <strong>" +
          nombre_aspirante +
          "</strong> fue actualizado con éxito</i>",
        icon: "success",
      }).then(() => {
        cerrarModalActualizar();
      });
    });
  };

  const deleteAspir = (val) => {
    Swal.fire({
      title: "Confirmar eliminado",
      html:
        "<i>¿Realmente desea eliminar a <strong>" +
        val.nombre_aspirante +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar los porcentajes asociados al aspirante
        Axios.delete(
          `https://ingenieria.unac.edu.co/alertas-srv/eliminar_porcentaje_desercion/${val.id_aspirante}`
        )
          .then(() => {
            // Eliminar los subcriterios asociados al aspirante
            Axios.delete(
              `https://ingenieria.unac.edu.co/alertas-srv/eliminar_subcriterios_aspirante/${val.id_aspirante}`
            )
              .then(() => {
                // Finalmente, eliminar al aspirante
                Axios.delete(
                  `https://ingenieria.unac.edu.co/alertas-srv/delete/${val.id_aspirante}`
                )
                  .then(() => {
                    // Actualizar la lista de aspirantes después de eliminar
                    getAspirantes();
                    limpiarCampos();
                    Swal.fire({
                      icon: "success",
                      title: val.nombre_aspirante + " fue eliminado",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  })
                  .catch((error) => {
                    console.error("Error al eliminar aspirante:", error);
                  });
              })
              .catch((error) => {
                console.error("Error al eliminar subcriterios:", error);
              });
          })
          .catch((error) => {
            console.error("Error al eliminar porcentajes:", error);
          });
      }
    });
  };

  const getAspirantes = () => {
    Axios.get("https://ingenieria.unac.edu.co/alertas-srv/aspirantes").then(
      (response) => {
        setAspirantes(response.data);
        setTablaaspirantes(response.data); // Mantén una copia de los aspirantes originales
      }
    );
  };

  const handleChange = (e, tipo) => {
    const terminoBusqueda = e.target.value.toLowerCase();
    if (tipo === "programa") {
      setFiltroPrograma(terminoBusqueda);
    } else if (tipo === "periodo") {
      setFiltroPeriodo(terminoBusqueda);
    }
    filtrar();
  };

  const filtrar = () => {
    const resultadosPrograma = tablaaspirantes.filter((elemento) => {
      const nombre_programa =
        (elemento.nombre_programa &&
          elemento.nombre_programa.toString().toLowerCase()) ||
        "";
      return filtroPrograma === "" || nombre_programa.includes(filtroPrograma);
    });

    const resultadosPeriodo = resultadosPrograma.filter((elemento) => {
      const periodo =
        (elemento.periodo && elemento.periodo.toString().toLowerCase()) || "";
      return filtroPeriodo === "" || periodo.includes(filtroPeriodo);
    });

    console.log("Resultados de la búsqueda:", resultadosPeriodo);
    setAspirantes(resultadosPeriodo);
  };

  useEffect(() => {
    getAspirantes();
  }, []);

  const limpiarCampos = () => {
    setNombre("");
    setCodigoCarnet("");
    setEmail("");
    setTelefono("");
    setId_aspirante("");
  };
  const getPeriodo = () => {
    Axios.get("https://ingenieria.unac.edu.co/alertas-srv/periodo")
      .then((response) => {
        setperiodos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los periodos:", error);
      });
  };
  getPeriodo();

  const getEntevistador = () => {
    Axios.get("https://ingenieria.unac.edu.co/alertas-srv/entrevistador")
      .then((response) => {
        setEntrevistador(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los periodos:", error);
      });
  };
  getEntevistador();

  const getProgramas = () => {
    Axios.get("https://ingenieria.unac.edu.co/alertas-srv/programa")
      .then((response) => {
        setProgramas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los programas:", error);
      });
  };
  getProgramas();

  return (
    <div className="container1">
      <div className="card">
        <div
          className="card-header"
          style={{
            fontSize: "1.5em",
            fontFamily: "Roboto, Sans-serif",
            fontWeight: 600,
            color: "#c28088",
          }}
        >
          <a
            href="/alertas/inicio"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Metropolis, Source Sans Pro, sans-serif",
            }}
          >
            <MDBIcon fas icon="arrow-alt-circle-left" size="2x" />
          </a>
          ASPIRANTES INGRESADOS PARA LA DE ENTEVISTA
          <div className="containerInput">
            <input
              className="form-control inputBuscar"
              value={filtroPrograma}
              placeholder="Búsqueda por programa"
              onChange={(e) => handleChange(e, "programa")}
            />
            <button className="btn btn-success">
              <MDBIcon fas icon="search" />
            </button>
            <input
              className="form-control inputBuscar"
              value={filtroPeriodo}
              placeholder="Búsqueda por periodo"
              onChange={(e) => handleChange(e, "periodo")}
            />
            <button className="btn btn-success">
              <MDBIcon fas icon="search" />
            </button>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr className="encabezado-tabla">
              <th scope="col">Nombre</th>
              <th scope="col">Código</th>
              <th scope="col">Email</th>
              <th scope="col">Entrevistador</th>
              <th scope="col">Programa</th>
              <th scope="col">Periodo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {aspirantesList.map((val, key) => {
              return (
                <tr key={val.id_aspirante}>
                  <td>{val.nombre_aspirante}</td>
                  <td>{val.codigo_carnet}</td>
                  <td>{val.email_aspirante}</td>
                  <td>{val.nombre_entrevistador}</td>
                  <td>{val.nombre_programa}</td>
                  <td>{val.periodo}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => mostrarModalActualizar(val)}
                        title="Editar"
                      >
                        <FaEdit size="2rem" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteAspir(val)}
                        className="btn btn-outline-danger"
                        title="Eliminar"
                      >
                        <MdDeleteForever size="2rem" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          (window.location.href = `/alertas/Entrevista/${val.id_aspirante}`)
                        }
                        className="btn btn-outline-primary"
                        title="Entrevista"
                      >
                        <GrNotes size="2rem" />
                      </button>
                      <button
                        type="button"
                        onClick={() => getNotas_SubCriterios(val.id_aspirante)}
                        className="btn btn-outline-secondary"
                        title="Calcular porcentaje"
                      >
                        <FaPercentage size="2rem" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalActualizar} className="custom-modal">
        <ModalHeader>
          <div>
            <h3>Editar Registro Aspirante</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="input-group mb-3 col-12">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              value={nombre_aspirante}
              onChange={(event) => setNombre(event.target.value)}
              className="form-control h-150"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Codigo Aspirante:{" "}
            </span>
            <input
              type="text"
              value={codigo_carnet}
              onChange={(event) => setCodigoCarnet(event.target.value)}
              className="form-control h-150"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Email:{" "}
            </span>
            <input
              type="text"
              value={email_aspirante}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control h-150"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Numero Telefono:{" "}
            </span>
            <input
              type="text"
              value={telefono_aspirante}
              onChange={(event) => setTelefono(event.target.value)}
              className="form-control h-150"
            />
          </div>
          <div className="input-group mb-3">
            <label htmlFor="inputState" className="input-group-text">
              Entrevistador:{" "}
            </label>
            <select
              id="inputState"
              className="form-select"
              value={id_entrevistador}
              onChange={(event) => setId_entrevistador(event.target.value)}
            >
              <option value="">{nombre_entrevistador}</option>
              {entrevistador &&
                entrevistador.map &&
                entrevistador.map((val) => (
                  <option
                    key={val.id_entrevistador}
                    value={val.id_entrevistador}
                  >
                    {val.nombre_entrevistador}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="inputState" className="input-group-text">
              Periodo:{" "}
            </label>
            <select
              id="inputState"
              className="form-select"
              value={id_periodo}
              onChange={(event) => setIdPeriodo(event.target.value)}
            >
              <option value="">{periodo}</option>
              {Array.isArray(periodos) &&
                periodos.map &&
                periodos.map((val) => (
                  <option key={val.id_periodo} value={val.id_periodo}>
                    {val.año} - {val.semestre}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="inputState" className="input-group-text">
              Programa:{" "}
            </label>
            <select
              id="inputState"
              className="form-select"
              value={id_programa}
              onChange={(event) => setid_programa(event.target.value)}
            >
              <option value="">{programa}</option>
              {Array.isArray(programas) &&
                programas.map &&
                programas.map((val) => (
                  <option key={val.id_programa} value={val.id_programa}>
                    {val.nombre_programa}
                  </option>
                ))}
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-warning" onClick={update}>
            Actualizar
          </Button>
          <Button className="btn btn-danger" onClick={cerrarModalActualizar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Inicio;