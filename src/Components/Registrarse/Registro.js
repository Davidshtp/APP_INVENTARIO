import "./registro.css"
import Retroceder from"../../setts/images/cerrar-sesion.png"
import { Link } from "react-router-dom"
import{useNavigate}from "react-router"
import { useState } from "react"
import Axios from "axios"
import Swal from 'sweetalert2'

//realizamos la funcion de registro de usuarios
export function Registro(){
    const history = useNavigate();//guardamos en history las rutas que hemos creado
    
    const[nombre,setnombre]=useState("")
    const[apellido,setapellido]=useState("")
    const[correo,setcorreo]=useState("")//asiganmos el usestate para manejar estados de algunos elementos
    const[contrasena,setcontrasena]=useState("")
    const[identifiacion,setidentificacion]=useState("")
    //realizamos la funcion de agregar un nuevo usuario
    const add=()=>{//validamos de que todos los campos esten llenos si no mostramos msj de error
        if (!nombre || !apellido || !correo || !contrasena || !identifiacion) {
            Swal.fire({
                title: 'Llene todos los campos',
                text:"",
                icon: 'warning'
              })
            return;
        }
        //si todos estan llenos procedemos a hacer el llamado a la funcion del backend para poder crear un nuevo usuario y agregarlo a la base de datos
        Axios.post("http://localhost:5000/create",
        {
          nombre:nombre,
          apellido:apellido,
          correo:correo,
          contrasena:contrasena,
          identifiacion:identifiacion
        }
    ).then(()=>{//luego de agregarlo se procede a mostrar msj de que fue registrado correctamente
        Swal.fire({
            icon: "success",
            title: "Has sido registrado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
        setTimeout(() => {
            history("/sesion")//despues de 3 segundos manda a esta ruta 
          }, 3000);
    }).catch(error => {
        console.error("Error al registrar:", error);//en dado caso que obtengamos un error lo imprimimos en la consola
    });
    };

    return <>
    <Link to={"/"}><img src={Retroceder} alt="imagen de retroceder" className="pages_back"></img></Link>{/*con el link hacemos que cuando se presione en la imagen redirija a la ruta que deseamos */}
    <div className="target">
        {/*renderizamos el formulario para el registro de usuario y sus campos a llenar */}
        <h1>Registrar Usuario</h1>
            <div className="container">
                <input type="text" className="input" placeholder="Nombres" onChange={(event)=>{
            setnombre(event.target.value)
        }}></input>
                <input type="text" className="input" placeholder="Apellidos" onChange={(event)=>{
            setapellido(event.target.value)
        }}></input>
                <input type="text" className="input" placeholder="Correo Electronico"  onChange={(event)=>{
            setcorreo(event.target.value)
        }}></input>
                <input type="text" className="input" placeholder="Identifiacion"  onChange={(event)=>{
            setidentificacion(event.target.value)
        }}></input>
                <input type="text" className="input" placeholder="Contraseña"  onChange={(event)=>{
            setcontrasena(event.target.value)
        }}></input>
            </div>   
       <button className="btn" onClick={add}>Registrar</button>{/*llamamos a la funcion de agregar para poder registrar una vez se haga click en el boton */}
           
    </div>
    
    </>
}