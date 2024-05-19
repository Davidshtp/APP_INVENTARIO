import "./editar_productos.css"
import { useState,useEffect } from "react"
import Swal from "sweetalert2"
import Axios from "axios"
//realizamos la funcion de editar producto con sus respectivos props a esperar
export function Editar({estado,cambiar_estado,actualizar_productos,productoAEditar,actualizarColorProductos}){
    const[producto,setproducto]=useState("")
    const[stock,setstock]=useState("")
    const[categoria,setcategoria]=useState("")//se establecen en elementos el usestate para el manejo de sus estados
    const[status,setstatus]=useState("")
    const[precio,setprecio]=useState("")
    const[id,setid]=useState("")
    const[Listcategorias, setListCategorias] = useState([]);
    //se usa el useeffect para obtener la lista de categorias que tenemos y poder indicarla en los campos de edicion del producto
    useEffect(() => {
        const obtenerCategorias = async () => {
          try {
            const response = await Axios.get("http://localhost:5000/listar_categorias");
            setListCategorias(response.data);
          } catch (error) {
            console.error("Error al obtener categorías:", error);
          }
        };
        obtenerCategorias();
    }, []);
    //se obtiene el producto a editar y se asigna esos valores del producto a los campos del producto del modal
    useEffect(() => {
        if (productoAEditar) {
            setproducto(productoAEditar.producto_nombre);
            setstock(productoAEditar.producto_cantidad);
            setcategoria(productoAEditar.producto_categoria);
            setstatus(productoAEditar.producto_status);
            setprecio(productoAEditar.producto_precio);
            setid(productoAEditar.id)
        }
    }, [productoAEditar]);
    //se realiza la funcion de edicion del producto
    const editar=()=>{//se verifica que los campos esten llenos, y si lo estan se indica al usuario un msj de error
        if (!producto || !precio || !status || !categoria || !stock) {
            Swal.fire({
                title: 'Llene todos los campos',
                text:"",
                icon: 'warning'
              })
            return;
        }
        //de lo contrario si no estan vacios se procede a hacer la peticion a el backend para poder actualizar los productos
        Axios.put("http://localhost:5000/update",
        {
          id:id,  
          producto:producto,
          precio:precio,
          status:status,
          categoria:categoria,
          stock:stock
        }
    ).then(()=>{//si se agregan correctamente se muesra el msj de que se actualizo correctamente
        Swal.fire({
            icon: "success",
            title: "El producto ha sido actualizado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
        actualizarColorProductos()  //se actualiza el color de los productos una vez hecha la edicion del producto
        actualizar_productos()//y se actualizan los productos que se miran
        setTimeout(() => {
            cambiar_estado(false)//se cierra el modal
          }, 1500);
    }).catch(error => {
        console.error("Error al editar producto:", error);//si llega a haber algun error se procede a imprimirlo en la consola
    });
    };
    
    return(<>
    {/*si el estado existe se renderiza el modal de editar productos */}
    {estado &&  <div className="contenedor_modal">
        {/*se renderiza el modal de productos y sus respectivos campos */}
        <div className="caja_modal">
             <h1 className="titulo_modal">Editar Productos</h1>
            <div className="contenedor_acciones_prodcuto">
                <input type="text" placeholder="Nombre del producto" className="inputs" value={producto} onChange={(event)=>{
                    setproducto(event.target.value)
                }}></input>
                <input type="number" placeholder="Stock" className="inputs" value={stock} onChange={(event)=>{
                    setstock(event.target.value)
                }}></input>
                 <select className="seleccionar" value={categoria} onChange={(event)=>{
                    setcategoria(event.target.value)
                }}>
                    <option>Categoria del producto</option>
                    {Listcategorias.map((categoria) => (//se realiza el recorrido de la lista de categorias que se trajo de la base de datos para renderizarlas y ponerlas como opciones a elegir
                  <option key={categoria.categoria_id} value={categoria.categoria_nombre}>{categoria.categoria_nombre}</option>
                ))}
                </select>
                <select className="seleccionar" value={status} onChange={(event)=>{
                    setstatus(event.target.value)
                }}>
                    <option>Seleccione el estado</option>
                    <option>Activo</option>
                    <option>Inactivo</option>
                </select>
                <input type="number" placeholder="Precio del Producto" className="inputs" value={precio} onChange={(event)=>{
                    setprecio(event.target.value)
                }}></input>
            </div>
            <div className="contenedor_btn">
                <button className="cancelar_prodcuto" onClick={()=>{
                    cambiar_estado(false) //se cierra el modal de edicion de producto
                }}>Cancelar</button>
                <button className="agregar_prodcuto" onClick={()=>{
                    editar()//se procede a hacer la logica de edicion del producto
                    actualizar_productos()//se actualiza la lista de productos a ver
                }}>Editar</button>
            </div>
            
        </div>

    </div>}
   
    </>
             
)
  
}
