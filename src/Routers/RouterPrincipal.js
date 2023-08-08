import React from "react";
import { Routes, Route, Link, BrowserRouter  } from "react-router-dom";
import { Ficha } from '../Componentes/Ficha';
import { App } from '../Componentes/App';


export const RouterPrincipal = () => {
    return(
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/" element={<Ficha/>}/>
                
                <Route path="*" element={(
                <>
                <h1>Error 408;</h1>
                <strong> Esta página no existe</strong>
                </>
                )}/>
            </Routes>

        </BrowserRouter>
    )
}