import React, { useState, useEffect } from "react";
import "../Aspirante/Aspirante.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { MDBIcon } from "mdb-react-ui-kit";

function AgregarAspirante() {
  const [nombre_aspirante, setNombre] = useState("");
  const [codigo_carnet, setCodigoCarnet] = useState("");
  const [email_aspirante, setEmail] = useState("");
  const [telefono_aspirante, setTelefono] = useState("");
  const [id_periodo, setIdPeriodo] = useState("");
  const [periodo, setPeriodo] = useState([]);
  const [id_entrevistador, setId_entrevistador] = useState("");
  const [entrevistador, setEntrevistador] = useState([]);
  const [id_programa, setId_programa] = useState([]);
  const [programa, setPrograma] = useState([]);

  useEffect(() => {
    getPeriodo();
  }, []);

  useEffect(() => {
    getEntevistador();
  }, []);

  useEffect(() => {
    getPrograma();
  }, []);

  const getEntevistador = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/entrevistador`)
      .then((response) => {
        setEntrevistador(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los periodos:", error);
      });
  };

  const getPeriodo = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/periodo`)
      .then((response) => {
        setPeriodo(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los periodos:", error);
      });
  };

  const getPrograma = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/programa`)
      .then((response) => {
        setPrograma(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los programas:", error);
      });
  };

  const add = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/create`, {
      nombre_aspirante: nombre_aspirante,
      codigo_carnet: codigo_carnet,
      email_aspirante: email_aspirante,
      telefono_aspirante: telefono_aspirante,
      id_periodo: id_periodo,
      id_entrevistador: id_entrevistador,
      id_programa: id_programa,
    })
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong> Registro exitoso!!!</strong>",
          html:
            "<i>El aspirante <strong>" +
            nombre_aspirante +
            "</strong> fue registrado con éxito</i>",
          icon: "success",
        }).then(() => {
          window.location.href = "/alertas/inicio";
        });
      })
      .catch((error) => {
        console.error("Error al agregar el aspirante:", error);
      });
  };

  const limpiarCampos = () => {
    setNombre("");
    setCodigoCarnet("");
    setEmail("");
    setTelefono("");
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div
          className="card-header"
          style={{
            fontSize: "1.5em",
            fontFamily: "Roboto, Sans-serif",
            fontWeight: 600,
            color: "#8bb8f1",
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
          FORMULARIO PARA AÑADIR UN ASPIRANTE
        </div>
        <div className="card-body">
          <div className="input-group mb-3 col-12 ">
            <span
              className="input-group-text "
              id="basic-addon1"
              style={{ backgroundColor: "#8bb8f1", borderColor: "#2b5784" }}
            >
              Nombre:
            </span>
            <input
              type="text"
              value={nombre_aspirante}
              onChange={(event) => setNombre(event.target.value)}
              className="form-control h-150"
              placeholder="Escribe el nombre del aspirante"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderColor: "#2b5784" }}
            />
          </div>
          <div className="input-group mb-3 ">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ backgroundColor: "#8bb8f1", borderColor: "#2b5784" }}
            >
              Codigo Aspirante:{" "}
            </span>
            <input
              type="text"
              value={codigo_carnet}
              onChange={(event) => setCodigoCarnet(event.target.value)}
              className="form-control h-150"
              placeholder="Escribe el codigo del aspirante"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderColor: "#2b5784" }}
            />
          </div>
          <div className="input-group mb-3 ">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ backgroundColor: "#8bb8f1", borderColor: "#2b5784" }}
            >
              Email:{" "}
            </span>
            <input
              type="text"
              value={email_aspirante}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control h-150"
              placeholder="Escribe el Email del aspirante"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderColor: "#2b5784" }}
            />
          </div>
          <div className="input-group mb-3 ">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ backgroundColor: "#8bb8f1", borderColor: "#2b5784" }}
            >
              Numero Telefono:{" "}
            </span>
            <input
              type="text"
              value={telefono_aspirante}
              onChange={(event) => setTelefono(event.target.value)}
              className="form-control h-150"
              placeholder="Escribe el numero telefónico del aspirante"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ borderColor: "#2b5784" }}
            />
          </div>
          <div className="input-group mb-3">
            <label
              className="input-group-text"
              htmlFor="inputState"
              style={{ backgroundColor: "#8bb8f1", borderColor: "#2b5784" }}
            >
              Periodo:
            </label>
            <select
              id="inputState"
              className="form-select"
              onChange={(event) => setIdPeriodo(event.target.value)}
              style={{ borderColor: "#2b5784" }}
            >
              <option value="">Selecciona el periodo</option>
              {periodo &&
                periodo.map &&
                periodo.map((val) => (
                  <option key={val.id_periodo} value={val.id_periodo}>
                    {val.año} - {val.semestre}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <label
              className="input-group-text"
              htmlFor="inputState"
              style={{ backgroundColor: "#8bb8f1", borderColor: "#2b5784" }}
            >
              Entrevistador:
            </label>
            <select
              id="inputState"
              className="form-select"
              onChange={(event) => setId_entrevistador(event.target.value)}
              style={{ borderColor: "#2b5784" }}
            >
              <option value="">Selecciona el entrevistador</option>
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
            <label
              className="input-group-text"
              htmlFor="inputState"
              style={{ backgroundColor: "#8bb8f1", borderColor: "#2b5784" }}
            >
              Programa:
            </label>
            <select
              id="inputState"
              className="form-select"
              onChange={(event) => setId_programa(event.target.value)}
              style={{ borderColor: "#2b5784" }}
            >
              <option value="">Selecciona el programa</option>
              {programa &&
                programa.map &&
                programa.map((val) => (
                  <option key={val.id_programa} value={val.id_programa}>
                    {val.nombre_programa}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn-guardar-aspirante" onClick={add}>
            Guardar Aspirante
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgregarAspirante;
