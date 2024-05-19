import "./categorias.css"
import { Navbar } from "../navbarInventario/navbar"
import agregar from "../../setts/images/Agregarproductos.png"
import editar from "../../setts/images/editar.png"
import eliminar from "../../setts/images/eliminar.png"
import { Modalcategorias } from "../modalAgregarCategorias/Modal_categorias"
import { Editarcategorias } from "../modalEditarCategorias/Editar_categorias"
import { useState,useEffect } from "react"
import axios from 'axios';
import Swal from "sweetalert2"//importamos para poder usar los efectos de sweet alert

export function Categorias(){
    //establecemos el usestate para cada elemento que pueda cambiar de valor a lo largo de la aplicacion
    const[estadomodal,cambiarestadomodal]=useState(false);
    const[estadomodaleditar,cambiarestadomodaleditar]=useState(false);
    const [categoriaAEditar, setcategoriaAEditar] = useState(null);
    const [categorias, setcategorias] = useState([]);
    // metodo para poder actualizar el color de los  productos cada que se agregue o elimine un elemento en la seccion
    const actualizarColorProductos = () => {
        axios.post('http://localhost:5000/actualizar_color_productos')
          .catch(error => {
            console.error('Error al actualizar el color de los productos:', error);
          });
      };
      //metodo para poder eliminar categoria por su id unico de base de datos
      const delete_categorias = (id) => {
        Swal.fire({
            title: "¿Quieres eliminar la categoría?",
            text: "¡Se borrará de tu inventario!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {//si el resultado es confirmado se elimina la categoria
                axios.get(`http://localhost:5000/verficar_Categoria_Asociada/${id}`)//con esto verificamos si la categoria tiene productos asociados
                    .then((response) => {
                        if (response.data.hasProducts) {//si tiene productos asociados da el msj de que no puede eliminarlos
                            Swal.fire({
                                title: "Error!",
                                text: "No se puede eliminar la categoría porque tiene productos asociados.",
                                icon: "error"
                            });
                        } else {
                            axios.delete(`http://localhost:5000/delete_categorias/${id}`).then(() => {//de lo contrario procede a eliminar la categoria y actualizar la lista de categorias y los colores
                                actualizarListaCategorias();
                                actualizarColorProductos();
                                Swal.fire({
                                    title: "¡Eliminado!",
                                    text: "La categoría ha sido eliminada con éxito.",
                                    icon: "success"
                                });
                            });
                        }
                    })
                    .catch((error) => {//msj de error por si no se logra verificar si tiene productos asociados
                        console.error('Error al verificar productos asociados:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Ocurrió un error al verificar los productos asociados.",
                            icon: "error"
                        });
                    });
            }
        });
    };
    //establecemos un useeffect para poder obtener la categorias que tenemos y poder listarlas
    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:5000/listar_categorias');
                setcategorias(response.data);
            } catch (error) {
                console.error('Error al obtener categorias:', error);
            }
        };

        obtenerCategorias();
    }, []); 
    // realizamos funcion que permite actualizar la listada de las categorias cada que se haga un cambio
    const actualizarListaCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:5000/listar_categorias');
            setcategorias(response.data);
        } catch (error) {
            console.error('Error al obtener categorias:', error);
        }
    };



   

    
    //a partir de aqui va la parte visual del componente categorias
    return <div>
        <Navbar/> 
        {/*aca se renderiza toda la parte de la cajad de categorias iniciando por la caja que tiene la funcionalidad de agregar nuevas categorias*/}
        <div className="container_caja">
            <div className="caja_categorias">
                <img src={agregar} alt="agregar elemento" className="agregar_logo" onClick={()=>{
                    cambiarestadomodal(true)
                }} ></img>
            </div>
            {/*con el .map podemos recorrer cada uno de las categorias que tenemos en la base de datos e irlas renderizando dependiendo de sus valores correspondientes */}
            {categorias.map(categorias => (
             <div key={categorias.categoria_id} className={`caja_categorias ${categorias.categoria_color}`}>
             <div className="info_producto"><p className="nombre_categoria">{categorias.categoria_nombre}</p></div>
             <div className="info_producto_status"><b>Estado: </b><b style={{ color: categorias.categoria_status === "Activo" ? "green" : "red" }}>{categorias.categoria_status}</b></div>
             <div className="contenedor_btn_categorias">
                 <img src={editar} alt="logo editar" className="logo_editar" onClick={()=>{
                    cambiarestadomodaleditar(true);
                    setcategoriaAEditar(categorias);

                 }}></img>
                 <img src={eliminar} alt="logo eliminar" className="logo_editar" onClick={()=>{
                   delete_categorias(categorias.categoria_id)

                 }} ></img>
             </div>
         </div>
        ))}        
        </div>
        {/*desde aca mandamos algunas funciones que ocupamos en otros componentes por medio de props */}
        <Modalcategorias
       estado={estadomodal}
       cambiar_estado={cambiarestadomodal}//en este caso estamos mandando props para poder mostrar la interfaz de agregar nueva cateogoria y actualizar la lista si se llega a agregar una nueva
       actualizar_Categoria={actualizarListaCategorias}
       />
       
       <Editarcategorias
       estado={estadomodaleditar}
       cambiar_estado={cambiarestadomodaleditar}
       categoriaAEditar={categoriaAEditar}//aca ingresamos props para editar ciertas categorias e indicar la interfaz de editar 
       actualizar_Categoria={actualizarListaCategorias}
       actualizarColorProductos={actualizarColorProductos}
       />


    </div>
        
}