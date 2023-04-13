import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./Componentes/App";
import { Login } from "./Componentes/Login"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
    <login />
  </React.StrictMode>
);
