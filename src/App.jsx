import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Aspirante from "./Componentes/Aspirante/Aspirante";
import { AuthProvider } from "./Componentes/AuthContext";
import Inicio from "./Componentes/Inicio/Inicio";
import Login from "./Componentes/Login/Login";
import { NavBar } from "./Componentes/NavBar/NavBar";
import VerAspirante from "./Componentes/VerAspirante/VerAspirante";
import Entrevista from "./Componentes/Entrevista/Entrevista";

function App() {
  return (
    <AuthProvider>
      <Router basename="/alertas">
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/verAspirante" element={<VerAspirante />} />
          <Route path="/entrevista/:id_aspirante" element={<Entrevista />} />
          <Route path="/aspirante" element={<Aspirante />} />
          {/* Otras rutas */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
