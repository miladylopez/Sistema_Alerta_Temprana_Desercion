import React, { useState } from 'react';
import '../index.css';

import unacImage from '../Imagenes/UNAC_Yellow.png';


export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (username === 'Zamirt' && password === '12345') {
      setLoggedIn(true);
    } else {
      alert('Credenciales inválidas');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleForgotPassword = () => {
    alert('Se ha enviado un correo electrónico para restablecer la contraseña');
  };

  return (
    <div className="container">
      <div className="left-half">
        <header>
          <h1 className="title">Sistema de Alerta Temprana</h1>
          <img src={unacImage} alt="Logo UNAC" className="logo" />
        </header>
        <main>
          {!loggedIn ? (
            <>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={handleUsernameChange}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                className="input-field"
              />
              <button onClick={handleLogin} className="button">
                Inicio de sesión
              </button>
              <button onClick={handleForgotPassword} className="forgot-password-button">
                Olvidé mi contraseña
              </button>
            </>
          ) : (
            <>
              <p>Bienvenido, {username}!</p>
              <button onClick={handleLogout} className="button">
                Cerrar sesión
              </button>
            </>
          )}
        </main>
      </div>
      <div className="right-half"></div>
    </div>
  );
}
