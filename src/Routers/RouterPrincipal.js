import React from "react";
import { Routes, Route, Link, BrowserRouter, NavLink  } from "react-router-dom";
import { Ficha } from '../Componentes/Ficha';
import { App } from '../App';
import { Login } from "../Componentes/Login";
import { Error } from "../Componentes/Error";
import { NavBar } from "../Componentes/NavBar";
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
                <Route path="*" element={(<Error/>)}/>
            </Routes>

        </BrowserRouter>
    )
}