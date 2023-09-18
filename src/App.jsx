import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Componentes/AuthContext';
import { NavBar } from './Componentes/NavBar';
import Ficha from './Componentes/Ficha';
import Error from './Componentes/Error';
import Login from './Componentes/Login';
import Metas from "./Componentes/Metas";
import Personalidad from "./Componentes/Personalidad";
import Presentacion from "./Componentes/Presentacion";
import Habilidades from "./Componentes/Habilidades";
import Aspirante from "./Componentes/Aspirante";
import Grafica from "./Componentes/Grafica"

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
          {/* Otras rutas */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

