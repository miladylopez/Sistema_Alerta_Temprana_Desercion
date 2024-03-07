import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Aspirante from "./Componentes/Aspirante/Aspirante";
import { AuthProvider } from './Componentes/AuthContext';
import Criterios_Evaluar from './Componentes/Criterios/Criterios/Criterios_Evaluar';
import Habilidades from "./Componentes/Criterios/SubCriterios/Habilidades";
import Metas from "./Componentes/Criterios/SubCriterios/Metas";
import Personalidad from "./Componentes/Criterios/SubCriterios/Personalidad";
import Presentacion from "./Componentes/Criterios/SubCriterios/Presentacion";
import Error from './Componentes/Error/Error';
import Grafica from "./Componentes/Grafica";
import Login from './Componentes/Login/Login';
import Inicio from './Componentes/Inicio/Inicio';
import Usuario from './Componentes/Usuario/Usuario'
import VerAspirante from './Componentes/VerAspirante/VerAspirante'
import { NavBar } from './Componentes/NavBar/NavBar';
import Aspecto_personal from "./Componentes/Popup/Presentacion/Popup_Aspecto_personal";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/Criterios_Evaluar" element={<Criterios_Evaluar />} />
          <Route path="/Error" element={<Error />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Inicio" element={<Inicio/>}/>
          <Route path="/Usuario" element={<Usuario />} />
          <Route path="/VerAspirante" element={<VerAspirante />} />
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

