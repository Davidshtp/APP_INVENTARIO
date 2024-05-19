import { useState,useEffect } from "react"
import "./editar_categorias.css"
import Swal from "sweetalert2"
import Axios from "axios"

export function Editarcategorias({estado,cambiar_estado,categoriaAEditar,actualizar_Categoria,actualizarColorProductos}){
    const[nombre,setnombre]=useState("")
    const[color,setcolor]=useState("") //establecemos el usestate para manejar los estados de ciertos elementos
    const[status,setstatus]=useState("")
    const[id,setid]=useState("")
    //con el usseefect indicamos que los valores de categoriaAeditar se le atribuyen  a los inputs de edicion
    useEffect(() => {
        if (categoriaAEditar) {
            setnombre(categoriaAEditar.categoria_nombre);
            setcolor(categoriaAEditar.categoria_color);
            setstatus(categoriaAEditar.categoria_status);
            setid(categoriaAEditar.categoria_id)
        }
    }, [categoriaAEditar]);
    //se realiza la funcion para poder editar la categoria
    const editar=()=>{
        //verificamos que todos los campos esten llenos  si no lo estan mandamos msj de error
        if (!status || !color || !nombre) {
            Swal.fire({
                title: 'Llene todos los campos',
                text:"",
                icon: 'warning'
              })
            return;
        }
        //de lo contrario hacemos la peticion por medio de axios de editar la categoria
        Axios.put("http://localhost:5000/update_Categorias",
        {
          id:id,  
          nombre:nombre,
          color:color,
          status:status
        }
    ).then(()=>{//luego si se actualiza bien se procede a actualizar el color de los productos y a actualizar las categorias a listar
        actualizarColorProductos()
        actualizar_Categoria()
        Swal.fire({//se muestra msj de que se actualizo correctamente
            icon: "success",
            title: "la categoria ha sido actualizada exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
        setTimeout(() => {
            cambiar_estado(false)//luego de 1.5 segundos se cierra el modal ya con todo actualizado
          }, 1500);
    }).catch(error => {
        console.error("Error al editar categoria:", error);//si sucede un error se imprime en consola
    });
    };
    
    return(<>
    {/*si el estado existe se mostrar el modal de editar categorias */}
    {estado &&  <div className="contenedor_modal">
        {/*se renderiza todo el modal de editar con sus respectivos campos  */}
        <div className="caja_modal_categorias">
             <h1 className="titulo_modal">Editar Categoria</h1>
            <div className="contenedor_acciones_prodcuto">
                <input type="text" placeholder="Nombre de categoria" className="inputs" value={nombre} onChange={(event)=>{
                    setnombre(event.target.value)
                }}></input>
                 <select className="seleccionar" value={color} onChange={(event)=>{
                    setcolor(event.target.value)
                }}>
                    <option>Color categoria</option>
                    <option>verde</option>
                    <option>rojo</option>
                    <option>azul</option>
                    <option>blanco</option>
                    <option>amarillo</option>
                    
                </select>
                <select className="seleccionar" value={status} onChange={(event)=>{
                    setstatus(event.target.value)
                }}>
                    <option>Seleccione el estado</option>
                    <option>Activo</option>
                    <option>Inactivo</option>
                </select>
            </div>
            <div className="contenedor_btn">
                <button className="cancelar_prodcuto" onClick={()=>{
                    cambiar_estado(false) //se cierra el modal
                }}>Cancelar</button>
                <button className="agregar_prodcuto" onClick={()=>{
                    editar() //ejecuta la funcionalidad de edicion de categorias y su logica para poder editar correctamente la categoria
                    actualizar_Categoria()//vuelve a hacer un llamado para actualizar la listada de categorias 
                }}>Editar</button>
            </div>
            
        </div>

    </div>}
   
    </>
             
)
  
}