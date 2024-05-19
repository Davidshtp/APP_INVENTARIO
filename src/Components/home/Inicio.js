import "./fondo.css"
import agregar from "../../setts/images/agregar.png"
import { Link } from "react-router-dom"//esta es la importacion previa de la libreria que nos ayudara a el cambio de rutas en nuestra app
//hacemos la funcion que renderizara el home o lo primero que vamos a ver cuando se abra en el navegador 
export function Inicio(){
    return (<><div className="contenedor-grid">
    <Link to={"/registro"} className="subrayado">
    <div className="elemento1">REGISTRATE</div>{/* en este caso se usa el link para mandar a cierta ruta dentro de nuestra app */}
    <img src={agregar} alt="agregar" className="agregar"></img>
    </Link>
    
    <Link to={"/Sesion"} className="subrayado"><div className="elemento2">INICIAR SESION</div></Link>
    </div>
    <h1 className="texto_bienvenida">¡Haz tu inventario ya!</h1>
  </>
)
}