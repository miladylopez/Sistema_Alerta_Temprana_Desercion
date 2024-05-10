import React, { useState } from "react";
import "../Login/Login.css";
import logoUnac from "../../Imagenes/UNAC_Blue.png";
import login from "../../Imagenes/Login2.jpg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import Axios from "axios";

const Login = () => {
  const [nombre_entrevistador, setNombre_entrevistador] = useState("");
  const [email_entrevistador, setEmail_entrevistador] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [telefono_entrevistador, setTelefono_entrevistador] = useState("");
  const [modalActualizar, setModalActualizar] = useState(false);

  const mostrarModalActualizar = (val) => {
    setNombre_entrevistador(val.nombre_entrevistador);
    setEmail_entrevistador(val.email_entrevistador);
    setContraseña(val.contraseña);
    setTelefono_entrevistador(val.telefono_entrevistador);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const add = () => {
    if (contraseña === confirmarContraseña) {
      Axios.post("https://ingenieria.unac.edu.co/alertas-srv/createUser", {
        nombre_entrevistador: nombre_entrevistador,
        email_entrevistador: email_entrevistador,
        contraseña: contraseña,
        telefono_entrevistador: telefono_entrevistador,
      })
        .then(() => {
          limpiarCampos();
          Swal.fire({
            title: "<strong> Registro exitoso!!!</strong>",
            html:
              "<i>El aspirante <strong>" +
              nombre_entrevistador +
              "</strong> fue registrado con éxito</i>",
            icon: "success",
            timer: 2000,
          }).then(() => {
            window.location.href = "/";
          });
        })
        .catch((error) => {
          console.error("Error al crear usuario:", error);
        });
    } else {
      // Las contraseñas no coinciden, muestra un mensaje de error
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
      });
    }
  };

  const iniciar_sesion = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(
        "https://ingenieria.unac.edu.co/alertas-srv/login",
        {
          email_entrevistador,
          contraseña,
        }
      );
      console.log(response.data); // Mensaje del servidor
      // Redirigir al usuario a otra página después del inicio de sesión exitoso
      window.location.href = "/inicio";
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response.data.message);
      // Mostrar un mensaje de error utilizando SweetAlert
      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        icon: "error",
      });
    }
  };

  const limpiarCampos = () => {
    setNombre_entrevistador("");
    setEmail_entrevistador("");
    setContraseña("");
    setConfirmarContraseña("");
    setTelefono_entrevistador("");
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={login}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBCardImage
                  src={logoUnac}
                  alt="login form"
                  className="rounded-start w-100"
                />
              </div>
              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Inicia sesion con tu cuenta
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                label="Correo"
                id="formControlLgEmail"
                type="email"
                size="lg"
                value={email_entrevistador}
                onChange={(e) => setEmail_entrevistador(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Contraseña"
                id="formControlLgPassword"
                type="password"
                size="lg"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />

              <Button
                className="mb-4 px-5"
                color="white"
                size="lg"
                onClick={iniciar_sesion}
                style={{ backgroundColor: "#2b5784", color: "white" }}
              >
                Iniciar sesion
              </Button>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                No tienes cuenta?{" "}
                <a
                  href="#!"
                  style={{ color: "#393f81" }}
                  onClick={() =>
                    mostrarModalActualizar({
                      nombre_entrevistador,
                      email_entrevistador,
                      contraseña,
                      telefono_entrevistador,
                    })
                  }
                >
                  Registrate
                </a>
              </p>

              <Modal isOpen={modalActualizar} className="custom-modal">
                <ModalHeader>
                  <div className="titulo" style={{ color: "2b5784" }}>
                    <h3>Registrate</h3>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Nombre"
                    id="form1"
                    type="text"
                    value={nombre_entrevistador}
                    onChange={(event) =>
                      setNombre_entrevistador(event.target.value)
                    }
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Email"
                    id="form1"
                    type="email"
                    value={email_entrevistador}
                    onChange={(event) =>
                      setEmail_entrevistador(event.target.value)
                    }
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Contraseña"
                    id="form1"
                    type="password"
                    value={contraseña}
                    onChange={(event) => setContraseña(event.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Vuelve a escribir la contraseña"
                    id="form1"
                    type="password"
                    value={confirmarContraseña}
                    onChange={(event) =>
                      setConfirmarContraseña(event.target.value)
                    }
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Numero de contacto"
                    id="form1"
                    type="text"
                    value={telefono_entrevistador}
                    onChange={(event) =>
                      setTelefono_entrevistador(event.target.value)
                    }
                  />

                  <Button className="registrarse" onClick={add}>
                    Registrarme
                  </Button>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="btn btn-danger"
                    onClick={cerrarModalActualizar}
                  >
                    Cancelar
                  </Button>
                </ModalFooter>
              </Modal>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
  );
};

export default Login;
