import "./navbar.css"
import usuario from "../../setts/images/usuario.png"
import cerrar_sesion from "../../setts/images/cerrar-sesion.png"
import categorias from "../../setts/images/categorias.png"
import producto from "../../setts/images/producto.png"
import Swal from "sweetalert2"
import{useNavigate}from "react-router"//el usenavigate se utiliza para poder redirigir a ciertas rutas dentro de la app
import { useLocation } from "react-router-dom";//el uselocation es para poder poder identificar la ruta en la que estamos y pode hacer la logica previa para poder cambiar el titulo dependiendo de la pagina en la que este
import { useState,useEffect } from "react"

export function Navbar(){
    const history=useNavigate()//contiene todas las rutas que tenemos especificadas en la app
    const usuarioNombre = localStorage.getItem("usuarioNombre"); //obtenemos los valores de los nombres de la persona que ingreso a la app
    const usuarioApellido =localStorage.getItem("usuarioApellido"); //obtenemos los valores de los apellidos  de la persona que ingreso a la app
    const [titulo, setTitulo] = useState("INVENTARIO");//agrego el usestate para manejar los estados del elemento
    const location = useLocation();//se obtiene la locacion o ruta en la cual estamos
    //se realiza la condicional de buscar en que ruta estamos y asi poder asignar al campo de titulo el texto corresponiente dependiendo de la ruta en la que estemos
    useEffect(() => {
        if (location.pathname === "/categorias") {
          setTitulo("Categorías");
        } else if (location.pathname === "/productos") {
          setTitulo("Productos");
        } else {
          setTitulo("INVENTARIO");
        }
      }, [location.pathname]);
      //funcion para salir de la app
    function salir(){
        Swal.fire({//se indica mensaje donde se pide confirmacion para poder salir
            title: "¿Quieres Cerrar Sesion?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Salir",
            cancelButtonText:"cancelar"
          }).then((result) => {//si la confirmacion es exitosa se realiza el cambio de ruta por medio del history que es el que contiene todas las rutas de la app
            if (result.isConfirmed) {
              history("/")
            }
          });
    }
    //funcion para redirigir a la ruta de categorias
    function Categorias(){
        history("/categorias")
    }
    //funcion para redirigir a la ruta de productos
    function Productos(){
        history("/productos")
    }
    
   return <div className="contenedor">
    <div className="superior">
        <div>INVENTARIO</div>
        <div className="barra_buscar">{titulo}</div>
        <div className="usuario_contenedor">
            <div>{usuarioNombre} {usuarioApellido}</div>
            <img src={usuario} className="logo_usuario" alt="logo usario"></img>
        </div>
    </div>
    <div className="barra_lateral">
        <img src={usuario} alt="logo de usuario" className="img_user"></img>
        <div className="circulo"></div>
        <div className="contenedor_categorias">
            <img src={categorias} alt="logo de categorias" className="logo_categoria"></img>
            <div className="categorias" onClick={Categorias}>Categorias</div>
        </div>
       <div className="contenedor_productos">
            <img src={producto} alt="logo de producto"className="logo_producto"></img>
            <div className="productos" onClick={Productos}>Productos</div>
       </div>
        
        <div className="cerrar" onClick={salir}>
            <div className="cerrar_sesion">Cerrar Sesion</div>
            <img src={cerrar_sesion} alt="logo de cerrar sesion" className="logo_cerrar_sesion"></img>
        </div>
        

            
    </div>

   </div>
};
