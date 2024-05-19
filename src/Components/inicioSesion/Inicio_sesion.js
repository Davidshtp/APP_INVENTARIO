import "./inicio.css"
import Retroceder from"../../setts/images/cerrar-sesion.png"//importacion de un archivo  png en la app
import { Link } from "react-router-dom"
import { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import{useNavigate}from "react-router"


export function Sesion(){
    const history = useNavigate();//este usehistory es el que nos tiene todas las rutas que ya hemos marcado o establecido en el index.js de la app
    //usamos el usestate para los campos de identificacion y contraseña que son campos que cambian de valores
    const [identifiacion, setidentificacion] = useState("");
    const [contrasena, setContrasena] = useState("");
    //se realiza un funcion que nos valide el inicio de sesion
    const iniciarSesion = () => {//como primera instancia verificamos que los campos esten llenos a travez de este condicional
        if (!identifiacion || !contrasena) {
            Swal.fire({
                title: 'Llene todos los campos',
                text:"",
                icon: 'warning'
              })
            return;
        }
        //si sucede que no estan vacios procede a comparar los valores ingresados y buscarlos en las bases de datos
        Axios.post("http://localhost:5000/login", {
          identifiacion:identifiacion,
          contrasena: contrasena
        }).then((response) => {//si la respuesta que envia el backend es positiva procede a darle accesos a la app
          const { data } = response;
          const { usuarioNombre } = data;  //captamos el nombre apellido y la data del usuario con el que ingresamos
          const { usuarioApellido } = data; 
          localStorage.setItem("usuarioNombre", usuarioNombre); // y la almacenamos en la memoria del navegador para posteriormente mostrar ese nombre de la persona en la interfaz de la app
          localStorage.setItem("usuarioApellido", usuarioApellido); 
            Swal.fire({
                icon: "success",//indicamos msj de que a accedido correctamente a la app
                title: "Loguiado exitosamente",
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(() => { 
                history("/productos") //pasados 1.5 segundos procedemos a redirigir a la ruta en donde estan los productos dentro de la app 
                //El history es el que permite indicar a la ubicacion a la cual se redirigira 
              }, 1500);
        }).catch(() => {
          //msj de error si la respuesta del backend es negativa indicando que no se encontro el usuario o el usuario o contraseña son incorrectos
          Swal.fire({
            title: 'Error al iniciar sesión',
            text: "Usuario no existe, o Credenciales incorrectas",
            icon: 'error'
          });
        });
      };
    return <>
    {/*en los visual renderizamos el formulario de inicio de sesion en el cual se obtienen los valores de los campos y se procede a llamar a la funcion que verifica todo para poder iniciar sesion */}
    <Link to={"/"}><img src={Retroceder} alt="imagen de retroceder" className="pages_back"></img></Link>
    <div className="target">
        <h1>Iniciar Sesion</h1>
        <input type="text" className="input" placeholder="Identificacion" onChange={(event)=>{
            setidentificacion(event.target.value)
        }}></input>
        <input type="password" className="input" placeholder="Contraseña" onChange={(event)=>{
            setContrasena(event.target.value)
        }}></input>
        <div className="flex">
        <Link to={"/registro"}><button className="btn_Iniciar">Registrarse</button> </Link>
        <button className="btn_Iniciar" onClick={iniciarSesion}>Iniciar</button> 
        </div>
              
    </div>
    </>
}