import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Componentes/AuthContext';
import { NavBar } from './Componentes/NavBar';
import Ficha from './Componentes/Ficha';
import Error from './Componentes/Error';
import Login from './Componentes/Login';
import Metas from "./Componentes/4Metas";
import Personalidad from "./Componentes/3Personalidad";
import Presentacion from "./Componentes/Criterio1/1Presentacion";
import Habilidades from "./Componentes/2Habilidades";
import Aspirante from "./Componentes/Aspirante";
import Grafica from "./Componentes/Grafica";
import Aspecto_personal from "./Componentes/Criterio1/1Aspecto_personal"

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

