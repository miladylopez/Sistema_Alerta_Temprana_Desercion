import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from '../App';
import { AuthContex } from "../Componentes/AuthContex";
import { Aspirante } from "../Componentes/Criterios/Criterios/Aspirante";
import { Ficha } from '../Componentes/Criterios/Criterios/Ficha';
import { Error } from "../Componentes/Error";
import { Habilidades } from "../Componentes/Habilidades";
import { Login } from "../Componentes/Login";
import { Metas } from "../Componentes/Metas";
import { NavBar } from "../Componentes/NavBar";
import { Personalidad } from "../Componentes/Personalidad";
import { Presentacion } from "../Componentes/Presentacion";


export const RouterPrincipal = () => {
    return(
        <BrowserRouter>
            <NavBar/>
        
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/Ficha" element={<Ficha/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Error" element={<Error/>}/>
                <Route path="/Presentacion" element={<Presentacion/>}/>
                <Route path="/Habilidades" element={<Habilidades/>}/>
                <Route path="/Metas" element={<Metas/>}/>
                <Route path="/Personalidad" element={<Personalidad/>}/>
                <Route path="/Aspirante" element={<Aspirante/>}/>
                <Route path="/AuthContext" element={<AuthContex/>}/>
                <Route path="*" element={(<Error/>)}/>
            </Routes>

        </BrowserRouter>
    )
}