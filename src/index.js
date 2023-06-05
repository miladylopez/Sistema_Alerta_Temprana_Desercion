import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import { Login} from "./Componentes/Login";
import { Ficha } from "./Componentes/Ficha";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    
    <Ficha />
    
  </React.StrictMode>
);
