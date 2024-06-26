import Axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { FaEdit, FaPercentage } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import "../VerAspirante/VerAspirante.css";

const Inicio = () => {
  const [aspirantesList, setAspirantes] = useState([]);
  const [tablaaspirantes, setTablaaspirantes] = useState([]);
  const [filtroPrograma, setFiltroPrograma] = useState("");
  const [filtroPeriodo, setFiltroPeriodo] = useState("");
  const [filtroCodigo, setFiltroCodigo] = useState("");
  const [filtroGeneral, setFiltroGeneral] = useState("");
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
  const [campoFiltroGeneral, setCampoFiltroGeneral] =
    useState("nombre_programa");

  const sumarNotas = (subcriterios) => {
    return subcriterios.reduce((total, subcriterio) => {
      return total + subcriterio.nota_sub_criterio_aspirante;
    }, 0);
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
    Axios.put(`${process.env.REACT_APP_API_URL}/update`, {
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

        // Eliminar los subcriterios asociados al aspirante
        Axios.delete(
          `${process.env.REACT_APP_API_URL}/eliminar_subcriterios_aspirante/${val.id_aspirante}`
        )
          .then(() => {
            // Finalmente, eliminar al aspirante
            Axios.delete(
              `${process.env.REACT_APP_API_URL}/delete/${val.id_aspirante}`
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
      }
    });
  };

  const getAspirantes = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/aspirantes`).then(
      (response) => {
        setAspirantes(response.data);
        setTablaaspirantes(response.data); // Mantén una copia de los aspirantes originales
      }
    );
  };

  useEffect(() => {
    filtrar();
  }, [
    filtroPrograma,
    filtroPeriodo,
    filtroCodigo,
    filtroGeneral,
    campoFiltroGeneral,
  ]);

  const filtrar = () => {
    let resultados = tablaaspirantes;

    if (filtroPrograma) {
      resultados = resultados.filter(
        (elemento) =>
          elemento.nombre_programa &&
          elemento.nombre_programa
            .toString()
            .toLowerCase()
            .includes(filtroPrograma.toLowerCase())
      );
    }

    if (filtroPeriodo) {
      resultados = resultados.filter(
        (elemento) =>
          elemento.periodo &&
          elemento.periodo
            .toString()
            .toLowerCase()
            .includes(filtroPeriodo.toLowerCase())
      );
    }

    if (filtroCodigo) {
      resultados = resultados.filter(
        (elemento) =>
          elemento.codigo_carnet &&
          elemento.codigo_carnet
            .toString()
            .toLowerCase()
            .includes(filtroCodigo.toLowerCase())
      );
    }

    if (filtroGeneral) {
      resultados = resultados.filter(
        (elemento) =>
          elemento[campoFiltroGeneral] &&
          elemento[campoFiltroGeneral]
            .toString()
            .toLowerCase()
            .includes(filtroGeneral.toLowerCase())
      );
    }

    setAspirantes(resultados);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "filtroPrograma") {
      setFiltroPrograma(value);
    } else if (name === "filtroPeriodo") {
      setFiltroPeriodo(value);
    } else if (name === "filtroCodigo") {
      setFiltroCodigo(value);
    } else if (name === "filtroGeneral") {
      setFiltroGeneral(value);
    }
  };

  const handleSelectChange = (e) => {
    setCampoFiltroGeneral(e.target.value);
  };

  useEffect(() => {
    getAspirantes();
    getEntevistador();
    getPeriodo();
    getProgramas();
  }, []);

  const limpiarCampos = () => {
    setNombre("");
    setCodigoCarnet("");
    setEmail("");
    setTelefono("");
    setId_aspirante("");
  };
  const getPeriodo = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/periodo`)
      .then((response) => {
        setperiodos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los periodos:", error);
      });
  };

  const getEntevistador = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/entrevistador`)
      .then((response) => {
        setEntrevistador(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los periodos:", error);
      });
  };

  const getProgramas = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/programa`)
      .then((response) => {
        setProgramas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los programas:", error);
      });
  };

  const nombreCampos = {
    nombre_programa: "Nombre Programa",
    periodo: "Período",
    codigo_carnet: "Código Carnet",
  };

  const getDesertionValue = async (id) => {
    await Axios.get(
      `${process.env.REACT_APP_API_URL}/obtener-probabilidad-por-aspirante/${id}`
    )
      .then((response) => {
        console.log(response);

        if (response.data.probabilidad) {
          const probabilidad = response.data.probabilidad;
          let icon, title;

          if (probabilidad < 30) {
            icon = "success";
            title = "No hay riesgo";
          } else if (probabilidad < 50) {
            icon = "warning";
            title = "Riesgo moderado";
          } else if (probabilidad >= 50 && probabilidad < 60) {
            icon = "warning";
            title = "Riesgo moderado";
          } else {
            icon = "error";
            title = "Alta probabilidad de deserción";
          }

          Swal.fire({
            title: title,
            text: `El porcentaje de probabilidad de deserción es: ${probabilidad}%`,
            icon: icon,
            confirmButtonText: "Cerrar",
            allowOutsideClick: false,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Registre la Entrevista",
          text: "Debe guardar la entrevista para calcular la probabilidad de deserción",
          icon: "error",
          confirmButtonText: "Cerrar",
          allowOutsideClick: false,
        });
      });
  };

  return (
    <div className="container1">
      <div className="verAspirante-container">
        <div className="card-header">
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
        </div>
        <h1> ASPIRANTES INGRESADOS PARA LA DE ENTREVISTA </h1>
        <div className="filtros, verAspirante-container">
          <div className="filtro-general">
            <select value={campoFiltroGeneral} onChange={handleSelectChange}>
              <option value="nombre_programa">Nombre Programa</option>
              <option value="periodo">Período</option>
              <option value="codigo_carnet">Código</option>
            </select>
            <input
              type="text"
              name="filtroGeneral"
              placeholder={`Filtrar por ${nombreCampos[campoFiltroGeneral]}`}
              value={filtroGeneral}
              onChange={handleChange}
            />
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
              <th scope="col">Período</th>
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
                        style={{
                          color: "#9289ca",
                          borderColor: "#9289ca",
                        }}
                        type="button"
                        onClick={() =>
                          (window.location.href = `/alertas/entrevista/${val.id_aspirante}`)
                        }
                        className="btn btn-outline-primary"
                        title="Entrevista"
                      >
                        <GrNotes size="2rem" />
                      </button>
                      <button
                        type="button"
                        onClick={() => getDesertionValue(val.id_aspirante)}
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
