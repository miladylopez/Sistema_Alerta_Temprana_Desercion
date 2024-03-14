import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import InformacionBasica from './Componentes//Criterios/SubCriterios/InformacionBasica';
import Aspirante from "./Componentes/Aspirante/Aspirante";
import { AuthProvider } from './Componentes/AuthContext';
import CriteriosEvaluar from './Componentes/Criterios/Criterios/Criterios_Evaluar'; // Cambiado el nombre del componente
import Habilidades from "./Componentes/Criterios/SubCriterios/Habilidades";
import Metas from "./Componentes/Criterios/SubCriterios/Metas";
import Personalidad from "./Componentes/Criterios/SubCriterios/Personalidad";
import Presentacion from "./Componentes/Criterios/SubCriterios/Presentacion";
import Error from './Componentes/Error/Error';
import Grafica from "./Componentes/Grafica";
import Inicio from './Componentes/Inicio/Inicio';
import Login from './Componentes/Login/Login';
import { NavBar } from './Componentes/NavBar/NavBar';
import Usuario from './Componentes/Usuario/Usuario';
import VerAspirante from './Componentes/VerAspirante/VerAspirante';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/Criterios_Evaluar" element={<CriteriosEvaluar />} />
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
          <Route path="/InformacionBasica" element={<InformacionBasica/>}/>
          {/* Otras rutas */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
