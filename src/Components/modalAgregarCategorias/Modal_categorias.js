import { useState } from "react";
import Axios from "axios" //axios es el que nos permite conectarnos con el backend de la app y poder realizar las consultas a la base de datos
import Swal from "sweetalert2";
import "./modal_categoria.css"
//realizamos la funcion que nos indicara el campo visual donde podemos agregar una nueva categoria dentro de la app
export function Modalcategorias({estado,cambiar_estado,actualizar_Categoria}){
    const[nombre,setnombre]=useState("")
    const[color,setcolor]=useState("")//establecemos el usestate para inputs que cambian sus valores
    const[status,setstatus]=useState("")
    //esta funcion es la que despues de agregar una nueva categoria limpia los campos de los inputs para que a la proxima creacion de una categoria se pueda iniciar con los valores en blanco
    const limpiarCampos = () => {
        setnombre("");
        setcolor("");
        setstatus("");
    };
    //se realiza la fuincion que nos permitira agregar la nueva categoria
    const add=()=>{//se valida por medio de este condicional que todos los valores tengan un valor de lo contrario mostrara un msj de llenar todos los campos 
        if (!nombre || !color || !status) {
            Swal.fire({
                title: 'Llene todos los campos',
                text:"",
                icon: 'warning'
              })
            return;
        }
        //si los campos esta llenos se procede a mandar esa informacion a travez de axio a la base de datos
        Axios.post("http://localhost:5000/crear_categorias",
        {
          nombre:nombre,
          color:color,
          status:status
        }
    ).then(()=>{//si todo salio bien y se registro en la base de datos se procede a enviar un msj de que se registro correctamente
        Swal.fire({
            icon: "success",
            title: "La categoria ha sido registrada exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
          //pasados 1.5 segundos prodecedera a limpiar los campos de los inputs y actualizar las categorias dentro de la app para que se muestre la nueva categoria agregada
          limpiarCampos()
          actualizar_Categoria()
        setTimeout(() => {
            cambiar_estado(false)//y en los mimos 1.5 segundos se cierra el modal o ventana de agregar categoria
        }, 1500);
    }).catch(error => {//si desde el backend capta algun error indicara el error en la consola
        console.error("Error al registrar producto:", error);
    });
    };
    return(<>{/*en este caso si el estado existe se mostrara el modal de agregar categorias */}
    {estado &&  <div className="contenedor_modal">
           {/*renderizamos el modal y sus inputs */}
        <div className="caja_modal">
             <h1 className="titulo_modal">Agregar Categoria</h1>
            <div className="contenedor_acciones_prodcuto">
                <input type="text" placeholder="Nombre de Categoria" className="inputs" onChange={(event)=>{
                    setnombre(event.target.value)//con esto obtenemos los valores de los inputs
                }}></input>
                 <select className="seleccionar" onChange={(event)=>{//esto es para que se ponga una casilla donde se puedan seleccionar el valor
                    setcolor(event.target.value)
                }}>
                    <option>Color Categoria</option>   {/*estas son las opciones */}
                    <option>rojo</option>
                    <option>azul</option>
                    <option>verde</option>
                    <option>blanco</option>
                    <option>amarillo</option>
                </select>
                <select className="seleccionar" onChange={(event)=>{
                    setstatus(event.target.value)
                }}>
                    <option>Seleccione el estado</option>
                    <option>Activo</option>
                    <option>Inactivo</option>
                </select>
            </div>
            <div className="contenedor_btn">
                <button className="cancelar_prodcuto" onClick={()=>{
                    cambiar_estado(false)//cuando cambiamos el estado a falso deja de mostrar el modal de agregar categorias
                }}>Cancelar</button>
                <button className="agregar_prodcuto" onClick={()=>{
                    add() //si damos al boton de agregar procedemos a llamar a la funcion de agregar
                }}>Agregar</button>
            </div>
            
        </div>

    </div>}
    
    </>)
}