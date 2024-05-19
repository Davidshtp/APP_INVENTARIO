import { Navbar } from "../navbarInventario/navbar"
import "./producto.css"
import agregar from "../../setts/images/Agregarproductos.png"
import { Modalproductos } from "../modalAgregarProductos/Modal_productos"
import { useState,useEffect } from "react"
import axios from 'axios';
import editar from "../../setts/images/editar.png"
import eliminar from "../../setts/images/eliminar.png"
import { Editar } from "../modalEditarProductos/Editar_productos"
import Swal from "sweetalert2"



//funcion para mostrar la seccion de productos
export function Productos(){
    const[estadomodal,cambiarestadomodal]=useState(false);
    const[estadomodaleditar,cambiarestadomodaleditar]=useState(false);//se asigna el usestate para manejar los estados de los elementos
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null);
    //funcion para poder actualizar la lista de productos que se observan
    const actualizarColorProductos = () => {
        axios.post('http://localhost:5000/actualizar_color_productos')
          .catch(error => {//si se capta algun error se imprime en la consola
            console.error('Error al actualizar el color de los productos:', error);
          });
      };

    
      //funcion para elimnar productos por id
    const delete_productos = (id) => {
        Swal.fire({//se muestra msj para poder reconfirmar si se quiere eliminar el producto
            title: "Quieres Eliminar El Producto?",
            text: "Se borrara de tu inventario!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
          }).then((result) => {//si se confirma que se quiere elimnar el producto se procede a hacer la peticion para borrar de la base de datos
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/delete_productos/${id}`).then(() => {   
                actualizarListaProductos();//una vez borrado se actualiza denuevo la lista de productos
                });
              Swal.fire({//luego de eso se procede a mostrar un msj de que se elimino correctamente
                title: "Eliminado!",
                text: "El producto ha sido eliminado con exito!!",
                icon: "success"
              });
            }
          });
        
    }
    //se usa el useeffect para poder obtener los productos cada que se entre a la pagina
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/listar_productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);//si hay error se procede a imprimirlo en la consola
            }
        };

        obtenerProductos();
    }, []); 
    //funcion para poder actualizar la lista de los productos
    const actualizarListaProductos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/listar_productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);//si hay error se procede a imprimirlo en la consola
        }
    };
    

    return<div>
        <Navbar/>
        {/*se procede a renderizar la caja de productos */}
        <div className="container_caja">
            <div className="caja">
                <img src={agregar} alt="agregar elemento" className="agregar_logo" onClick={()=>{
                    cambiarestadomodal(true)
                }}></img>
            </div>
         {productos.map(producto => (//aca se realiza el recorrido para poder ir renderizando cada producto con sus caracteristicas propias 
            <div key={producto.id} className={`caja ${producto.producto_categoria_color ? producto.producto_categoria_color : ''}`}>
                <div className="titulo_producto">{producto.producto_nombre}</div>
                <div className="info_producto"><b>Precio: </b>{producto.producto_precio}</div>
                <div className="info_producto"><b>Cantidad:</b> {producto.producto_cantidad}</div>
                <div className="info_producto_status"><b>Estado:</b><b style={{ color: producto.producto_status === "Activo" ? "green" : "red" }}>{producto.producto_status}</b></div>
                <div className="info_producto"><b>Categoria:</b> {producto.producto_categoria}</div>
                <div className="contenedor_btn_productos">
                    <img src={editar} alt="logo editar" className="logo_editar" onClick={()=>{
                    cambiarestadomodaleditar(true);//se muestra el modal de editar
                    setProductoAEditar(producto);//se envia el producto que se va a editar al componente de editar
                }}></img>
                    <img src={eliminar} alt="logo eliminar" className="logo_editar" onClick={()=>{
                    delete_productos(producto.id)//se llama a la funcion que elimina y se le pasa el id del producto a eliminar
                }}></img>
                </div>
            </div>
        ))}
                    
        </div>
        <Modalproductos
        estado={estadomodal}//se pasan los props de los componentes externos
        cambiar_estado={cambiarestadomodal}
        actualizar_productos={actualizarListaProductos}
        actualizarColorProductos={actualizarColorProductos}
        />
        <Editar
         estado={estadomodaleditar}
         cambiar_estado={cambiarestadomodaleditar}
         actualizar_productos={actualizarListaProductos}
         productoAEditar={productoAEditar}
         actualizarColorProductos={actualizarColorProductos}
        />
        
    </div>
}