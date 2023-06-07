import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import { Login} from "./Componentes/Login";
import { Ficha } from "./Componentes/Ficha";
import { Login} from "./Componentes/Login";


ReactDOM.render(
  <React.StrictMode>
    <Ficha />
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);

