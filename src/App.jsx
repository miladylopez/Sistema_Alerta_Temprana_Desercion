import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './Componentes/AuthContext';
import Aspirante from "./Componentes/Criterios/Criterios/Aspirante";
import Ficha from './Componentes/Criterios/Criterios/Ficha';
import Habilidades from "./Componentes/Criterios/SubCiterios/Habilidades";
import Metas from "./Componentes/Criterios/SubCiterios/Metas";
import Personalidad from "./Componentes/Criterios/SubCiterios/Personalidad";
import Presentacion from "./Componentes/Criterios/SubCiterios/Presentacion";
import Error from './Componentes/Error/Error';
import Grafica from "./Componentes/Grafica";
import Login from './Componentes/Login/Login';
import { NavBar } from './Componentes/NavBar/NavBar';
import Aspecto_personal from "./Componentes/Popup/Presentacion/Popup_Aspecto_personal";

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

