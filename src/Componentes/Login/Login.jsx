import Axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import login from "../../Imagenes/Login2.jpg";
import logoUnac from "../../Imagenes/UNAC_Blue.png";
import "../Login/Login.css";

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
      Axios.post(`${process.env.REACT_APP_API_URL}/createUser`, {
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
              "<i>El usuario <strong>" +
              nombre_entrevistador +
              "</strong> fue registrado con éxito</i>",
            icon: "success",
            timer: 2000,
          }).then(() => {
            window.location.href = "/alertas";
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
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email_entrevistador,
          contraseña,
        }
      );
      console.log(response.data); // Mensaje del servidor
      // Redirigir al usuario a otra página después del inicio de sesión exitoso
      window.location.href = "/alertas/inicio";
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
                Inicia sesión con tu cuenta
              </h5>

              <div className="mb-4">
                <label htmlFor="formControlLgEmail" className="custom-label">Correo</label>
                <MDBInput
                  id="formControlLgEmail"
                  type="email"
                  size="lg"
                  value={email_entrevistador}
                  onChange={(e) => setEmail_entrevistador(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="formControlLgPassword" className="custom-label">Contraseña</label>
                <MDBInput
                  id="formControlLgPassword"
                  type="password"
                  size="lg"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
              </div>

              <Button
                className="mb-4 px-5"
                color="white"
                size="lg"
                onClick={iniciar_sesion}
                style={{ backgroundColor: "#2b5784", color: "white" }}
              >
                Iniciar sesión
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
                  Regístrate
                </a>
              </p>

              <Modal isOpen={modalActualizar} className="custom-modal">
                <ModalHeader>
                  <div className="titulo" style={{ color: "2b5784" }}>
                    <h3>Registrate</h3>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="mb-3">
                    <label htmlFor="form" className="custom-label">
                      Nombre
                    </label>
                    <MDBInput
                      id="form"
                      type="text"
                      value={nombre_entrevistador}
                      onChange={(event) =>
                        setNombre_entrevistador(event.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="form1" className="custom-label">
                      Email
                    </label>
                    <MDBInput
                      id="form1"
                      type="email"
                      value={email_entrevistador}
                      onChange={(event) =>
                        setEmail_entrevistador(event.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="form2" className="custom-label">
                      Contraseña
                    </label>
                    <MDBInput
                      id="form2"
                      type="password"
                      value={contraseña}
                      onChange={(event) => setContraseña(event.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="form3" className="custom-label">
                      Vuelve a escribir la contraseña
                    </label>
                    <MDBInput
                      id="form3"
                      type="password"
                      value={confirmarContraseña}
                      onChange={(event) =>
                        setConfirmarContraseña(event.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="form4" className="custom-label">
                      Numero de contacto
                    </label>
                    <MDBInput
                      id="form4"
                      type="text"
                      value={telefono_entrevistador}
                      onChange={(event) =>
                        setTelefono_entrevistador(event.target.value)
                      }
                    />
                  </div>

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