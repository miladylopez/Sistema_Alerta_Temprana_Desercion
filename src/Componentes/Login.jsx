import React, { useState } from 'react';
import '../index.css';

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

  return (
    <div className="container">
      <div className="left-half">
        <header>
          <h1>Sistema de Alerta Temprana</h1>
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
                Inicio
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
