import React from "react"    
import ReactDOM from "react-dom/client"
import {Inicio} from "./Components/home/Inicio.js"
import {Sesion} from "./Components/inicioSesion/Inicio_sesion.js"
import { Registro } from "./Components/Registrarse/Registro.js"
import { Found } from "./Components/pagesFound/Page_Fail.js"
import { Productos } from "./Components/productos/Productos.js"
import { Categorias } from "./Components/categorias/categorias.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"



//creamos la constante que encierra tood lo que vamos a renderizar
const root=ReactDOM.createRoot(document.getElementById("root"))
//renderizamos la constante
root.render(
<div>
  {/*creamos todas las rutas de nuesta app*/}
  <Router>
        <Routes> 
            <Route path="/" element={<Inicio/>} />
            <Route path="/sesion" element={<Sesion/>} />
            <Route path="/registro" element={<Registro/>}/>
            <Route path="/productos" element={<Productos/>}/>
            <Route path="/categorias" element={<Categorias/>}/>
            <Route path="*" element={<Found/>}/>
        </Routes>
 </Router>
   
</div>



   
)
