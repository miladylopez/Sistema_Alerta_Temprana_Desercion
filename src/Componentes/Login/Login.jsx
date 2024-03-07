import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import logoUnac from '../../Imagenes/UNAC_Yellow.png';

const Login = () => {
  const navigate = useNavigate();
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
      navigate('/Inicio');
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
    <div className="login-container">
      <div className="login-form p-8 bg-white rounded-lg shadow-md">
        <form className="space-y-6">
          <div>
            <img src={logoUnac} alt="Mi Imagen" className="ImagenLogin" />
          </div>
            <div className="username-input">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="USUARIO"
                value={username}
                onChange={handleUsernameChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            <div className="password-input">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="CONTRASEÑA"
                value={password}
                onChange={handlePasswordChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="login-button"
            >
              Iniciar sesión
            </button>
            <span
              onClick={handleForgotPassword}
              className="forgot-password"
            >
              ¿Olvidaste tu contraseña?
            </span>
          
        </form>  
        <div className="cuadro">
        </div>
      </div>
    </div>
  );
}

export default Login;