import "./modal_producto.css"
import { useState,useEffect } from "react"
import Swal from "sweetalert2"
import Axios from "axios"

//realizamos la funcion para poder mostrar el modal de agregar productos
export function Modalproductos({estado,cambiar_estado, actualizar_productos,actualizarColorProductos}){
    const[producto,setproducto]=useState("")
    const[stock,setstock]=useState("")
    const[categoria,setcategoria]=useState("")//aplicamos el usestate para los elementos que cambia de valor
    const[status,setstatus]=useState("")
    const[precio,setprecio]=useState("")
    const[Listcategorias, setListCategorias] = useState([]);

   
    
    //se usa el usseefect para desatar la funcionalidad de obtener las categorias que existen y poder agregarlas a las opciones a las que vamos a asociar al producto
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
      //realizamos la funcion para poder limpiar los formularios
    const limpiarCampos = () => {
        setproducto("");
        setstock("");
        setcategoria("");
        setstatus("");
        setprecio("");
    };

   
    //establecemos una funcion para poder agregar un nuevo producto
    const add=()=>{//verificamos primeramente si todas las casillas de los inputs estan llenas de lo contrario tiramos el msj de error
        if (!producto || !precio || !status || !categoria || !stock) {
            Swal.fire({
                title: 'Llene todos los campos',
                text:"",
                icon: 'warning'
              })
            return;
        }
        //si estan llenas procedemos a hacer la solicitud de crear el producto a el backend el cual agrega a la base de datos
        Axios.post("http://localhost:5000/crear_productos",
        {
          producto:producto,
          precio:precio,
          status:status,
          categoria:categoria,
          stock:stock
        }
    ).then(()=>{//luego de que se agregue y la respuesta sea que si se agrego se envia el msj al usuario de que se agrego correctamente
        Swal.fire({
            icon: "success",
            title: "El producto ha sido registrado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
          actualizarColorProductos()//se acuatliza el color de los productos
          actualizar_productos()//se actualiza la lista de productos para que se listen
          limpiarCampos()//se limpian los campos despues de haber confirmado que se agrego
        setTimeout(() => {
            cambiar_estado(false)//el modal de productos se pone en false para que se desaparezca
          }, 1500);
    }).catch(error => {
        console.error("Error al registrar producto:", error);//en caso de error imprimirlo en la consola
    });
    };


    return(<>{/*si el modal existe entonces se muestra el contenido */}
    {estado &&  <div className="contenedor_modal">
        {/*se procede a renderizar todo el modal de agregar producto */}
        <div className="caja_modal">
             <h1 className="titulo_modal">Agregar Productos</h1>
            <div className="contenedor_acciones_prodcuto">
                <input type="text" placeholder="Nombre del producto" className="inputs" onChange={(event)=>{
                    setproducto(event.target.value)
                }}></input>
                <input type="number" placeholder="Stock" className="inputs" onChange={(event)=>{
                    setstock(event.target.value)
                }}></input>
                 <select className="seleccionar" onChange={(event)=>{
                    setcategoria(event.target.value)
                }}>
                    <option>Categoria del producto</option>
                    {Listcategorias.map((categoria) => (//con este map vamos recorriendo todas las categorias que tenemos y vamos colocandolas de opciones para que el usuario pueda escoger
                  <option key={categoria.categoria_id} value={categoria.categoria_nombre}>{categoria.categoria_nombre}</option>
                ))}
                </select>
                <select className="seleccionar" onChange={(event)=>{
                    setstatus(event.target.value)
                }}>
                    <option>Seleccione el estado</option>
                    <option>Activo</option>
                    <option>Inactivo</option>
                </select>
                <input type="number" placeholder="Precio del Producto" className="inputs" onChange={(event)=>{
                    setprecio(event.target.value)
                }}></input>
            </div>
            <div className="contenedor_btn">
                <button className="cancelar_prodcuto" onClick={()=>{
                    cambiar_estado(false)//en el caso que le de a cancelar el modal se dejara de mostrar
                }}>Cancelar</button>
                <button className="agregar_prodcuto" onClick={()=>{
                     add() //si le da a agregar se procedera a hacer toda la logica para poder agregar el producto
                }}>Agregar</button>
            </div>
            
        </div>

    </div>}
   
    </>
             
)
}