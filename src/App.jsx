import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Aspecto_personal from "./Componentes/1Aspecto_personal";
import { AuthProvider } from './Componentes/AuthContext';
import Presentacion from "./Componentes/Criterios/Criterios/1Presentacion";
import Habilidades from "./Componentes/Criterios/Criterios/2Habilidades";
import Personalidad from "./Componentes/Criterios/Criterios/3Personalidad";
import Metas from "./Componentes/Criterios/Criterios/4Metas";
import Aspirante from "./Componentes/Criterios/Criterios/Aspirante";
import Ficha from './Componentes/Criterios/Criterios/Ficha';
import Error from './Componentes/Error';
import Grafica from "./Componentes/Grafica";
import Login from './Componentes/Login';
import { NavBar } from './Componentes/NavBar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/Ficha" element={<Ficha />} />
          <Route path="/Error" element={<Error />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Metas" element={<Metas/>}/>
          <Route path="/Aspirante" element={<Aspirante/>}/>
          <Route path="/Personalidad" element={<Personalidad/>}/>
          <Route path="/Presentacion" element={<Presentacion/>}/>
          <Route path="/Habilidades" element={<Habilidades/>}/>
          <Route path="/Grafica" element={<Grafica/>}/>
          <Route path="/Aspecto_personal" element={<Aspecto_personal/>}/>
          {/* Otras rutas */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

