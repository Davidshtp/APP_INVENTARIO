const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');//importamos las librerias que necesitamos para el proyecto
const cors = require('cors');
const { Await } = require('react-router-dom');

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());
//de esta manera conectamos la base de datos al backend
const db = mysql.createConnection({
  host: 'localhost',
  user: 'INVENTARIO',
  password: '40781889',
  database: 'inventario'
});
//si llega a existir un error en la conexion a la base de datos lo imprimiremos
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  //de lo contrario imprimimos que se conecto correctamente
  console.log('Conexión a la base de datos establecida');
});

//APIS
//creacion de usuarios
app.post("/create",(req,res)=>{
  const correo=req.body.correo;//asignamos a constantes los valores que enviamos desde el fronted
  const contrasena=req.body.contrasena;
  const nombre=req.body.nombre;
  const apellido=req.body.apellido;
  const identifiacion=req.body.identifiacion;
  //hacemos la consulta de insertar datos a la base de datos y asignamos los valores de las variables que previamente creamos
  db.query("INSERT INTO users(usuario_nombre,usuario_apellido,usuario_correo,usuario_contrasena,usuario_identificacion)VALUES(?,?,?,?,?)",[nombre,apellido,correo,contrasena,identifiacion],
  (err,result)=>{//en dado caso de error en el proceso se procede a imprimir el error
    if(err){
      console.log(err)
    }else{ //de lo contrario se notifica que fue exitoso el registro
      res.send("Usuario Registrado con exito")
    }
  }
);
});
//login usuarios
app.post("/login", (req, res) => {
  const identifiacion = req.body.identifiacion;//asignamos a constantes los valores que enviamos desde el fronted
  const contrasena = req.body.contrasena;
  //hacemos la consulta de consultar datos a la base de datos y asignamos los valores de las variables que previamente creamos
  db.query("SELECT * FROM users WHERE usuario_identificacion = ? AND usuario_contrasena = ?", [identifiacion, contrasena], (err, result) => {
    if (err) { //en dado caso de error en el proceso se procede a imprimir el error
      console.log(err);
      res.status(500).send("Error interno del servidor");
    } else {//si se inicio sesion correctamente asignaremos los valores de nombre y apellidos de la persona que ingreso a la app y los enviaremos para poder manejar esos datos en el fronted
      if (result.length > 0) {
        const usuarioNombre = result[0].usuario_nombre;
        const usuarioApellido= result[0].usuario_apellido
        res.status(200).json({ message: "Inicio de sesión exitoso", usuarioNombre: usuarioNombre, usuarioApellido:usuarioApellido });
      } else {
        res.status(401).send("Credenciales incorrectas");//erro de credenciales incorrectas
      }
    }
  });
});
//creacion de productos
app.post("/crear_productos",(req,res)=>{
  const producto=req.body.producto;
  const precio=req.body.precio;//asignamos a constantes los valores que enviamos desde el fronted
  const categoria=req.body.categoria;
  const status=req.body.status;
  const stock=req.body.stock;
  //hacemos la consulta de insertar datos a la base de datos y asignamos los valores de las variables que previamente creamos
  db.query("INSERT INTO productos(producto_nombre,producto_precio,producto_categoria,producto_status,producto_cantidad) VALUES(?,?,?,?,?)",[producto,precio,categoria,status,stock],
  
  (err,result)=>{
    if(err){//en dado caso de error en el proceso se procede a imprimir el error
      console.log(err)
    }else{//de lo contrario se notifica que fue exitoso el registro del producto
      res.send("Producto Registrado con exito")
    }
  }
)
});
//listar productos
app.get('/listar_productos', (req, res) => {
  //realizamos la consulta de buscar en la base de datos los productos
  db.query('SELECT * FROM productos', (err, result) => {
    if (err) {
      console.error('Error al listar productos:', err);//en dado caso que suceda un error imrpimira el error y el msj de error al listar productos
      res.status(500).send('Error al listar productos');
      return;
    }   
    console.log('Productos:', result);//de lo contrario imprimira los productos que hay en la base de datos registrados
    res.json(result);
  });
});
//editar productos
app.put("/update",(req,res)=>{
  const id=req.body.id 
  const producto=req.body.producto;
  const precio=req.body.precio;//asignamos a constantes los valores que enviamos desde el fronted
  const categoria=req.body.categoria;
  const status=req.body.status;
  const stock=req.body.stock;
  //hacemos la consulta de actualizar datos a la base de datos y asignamos los valores de las variables que previamente creamos
  db.query("UPDATE productos SET producto_nombre=?,producto_precio=?,producto_categoria=?,producto_status=?,producto_cantidad=? WHERE id=?",[producto,precio,categoria,status,stock,id],
  (err,result)=>{
    if(err){//en dado caso de error en el proceso se procede a imprimir el error
      console.log(err)
    }else{//de lo contrario se notifica que fue exitosa la edicion del producto
      res.send("Producto Actualizado con exito")
    }
  }
)
});
//eliminar productos
app.delete('/delete_productos/:id', (req, res) => {
  const id=req.params.id;//hacemos una variable a la cual le asignaremos el id del elemento de la base de datos que queremos eliminar que previamente fue enviado desde el fronted
//realizamos la consulta de eliminar por medio de ese id 
  db.query('DELETE FROM productos WHERE id=?',id, 
  (err, result) => {
    if (err) {//en dado caso de error se lo imprimira
      console.error('Error al eliminar productos:', err);
      
    }else{//de lo contrario se mostrara el msj de eliminado con exito
      res.send("Producto eliminado con exito!!")
    }
    
  });
});
//creacion de categorias
app.post("/crear_categorias",(req,res)=>{
  const nombre=req.body.nombre;
  const color=req.body.color;//asignamos a constantes los valores que enviamos desde el fronted
  const status=req.body.status;
 
  //hacemos la consulta de insertar datos a la base de datos y asignamos los valores de las variables que previamente creamos
  db.query("INSERT INTO categorias(categoria_nombre,categoria_status,categoria_color) VALUES(?,?,?)",[nombre,status,color],
  (err,result)=>{
    if(err){//en dado caso de error se lo imprimira
      console.log(err)
    }else{//de lo contrario se mostrara el msj de categoria agregada con exito
      res.send("Categoria Registrado con exito")
    }
  }
)
});
//editar categorias
app.put("/update_Categorias",(req,res)=>{
  const id=req.body.id 
  const nombre=req.body.nombre;//asignamos a constantes los valores que enviamos desde el fronted
  const color=req.body.color;
  const status=req.body.status;
   //hacemos la consulta de actualizar datos a la base de datos y asignamos los valores de las variables que previamente creamos
  db.query("UPDATE categorias SET categoria_nombre=?,categoria_status=?,categoria_color=?  WHERE categoria_id=?",[nombre,status,color,id],
  (err,result)=>{
    if(err){//en dado caso de error se lo imprimira
      console.log(err)
    }else{//de lo contrario se mostrara el msj de categoria editada con exito
      res.send("Producto Actualizado con exito")
    }
  }
)
});
//listar categorias
app.get('/listar_categorias', (req, res) => {
   //realizamos la consulta de buscar en la base de datos las categorias
  db.query('SELECT * FROM categorias', (err, result) => {
    if (err) {//si hubo algun error se lo imprimira
      console.error('Error al listar categorias:', err);
      res.status(500).send('Error al listar categorias');
      return;
    }
    console.log('categorias', result);//de lo contrario se imprimiran las categorias que hay en la base de datos
    res.json(result);
  });
});
//eliminar categorias
app.delete('/delete_categorias/:id', (req, res) => {
  const id = req.params.id;//realizamos la variable que almacenara el id de la categoria a eliminar que previamente fue enviada desde el fronted 

  //verificacion de si la categoria tiene productos asociados
  //se realiza una consulta para verificar si la categoria tiene asociados productos
  db.query('SELECT * FROM productos WHERE producto_categoria = (SELECT categoria_nombre FROM categorias WHERE categoria_id = ?)', [id], (err, result) => {
    if (err) {
      console.error('Error al verificar productos asociados:', err);
      res.status(500).send('Error al verificar productos asociados');//si ocurre algun error se imprimira 
      return;
    }
    if (result.length > 0) {//si se encuentra que tiene productos asociados se procede a mostrar el msj de que no se puede eliminar
      res.status(400).send('No se puede eliminar la categoría porque tiene productos asociados.');
    } else {
      // si no tiene productos asociados se procede con la eliminacion de la categoria
      //si no tiene productos asociados se procede a realizar la consulta de eliminacion por medioi del id
      db.query('DELETE FROM categorias WHERE categoria_id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error al eliminar categoría:', err);//en dado caso de error en el proceso se imprime el error
          res.status(500).send('Error al eliminar categoría');
          return;
        }
        res.send('Categoría eliminada con éxito!');//si fue eliminada con exito se procede a enviar msj de confirmacion de eliminacion
      });
    }
  });
});
// Ruta para ejecutar el script SQL para actualizar la columna "producto_categoria_color"

app.post('/actualizar_color_productos', (req, res) => {//se asigna a la variable sql el codigo del script que queremos ejecutar cada que que se llame a esta ruta del backend
  const sql = `
  UPDATE productos p
  LEFT JOIN categorias c ON p.producto_categoria = c.categoria_nombre
  SET p.producto_categoria_color = IFNULL(c.categoria_color, NULL);
`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al ejecutar el script SQL:', err);//en dado caso de error se imprimira el error
      res.status(500).send('Error al ejecutar el script SQL');
      return;
    }
    console.log('Se ha actualizado el color de los productos correctamente');//de lo contrario se actualizaran los colores de los productos de la base de datos y se mostrara el msj de que fue exitoso
    res.send('Se ha actualizado el color de los productos correctamente');
  });
});
//verificacion de si una categoria tiene asociado un producto
app.get('/verficar_Categoria_Asociada/:id', (req, res) => {//a la variable le asignamos el valor del id que traemos del backend
  const id = req.params.id;
  //realizamos la consulta a la base de datos para verficar que la categoria no tenga productos asociados
  db.query('SELECT * FROM productos WHERE producto_categoria = (SELECT categoria_nombre FROM categorias WHERE categoria_id = ?)', [id], (err, result) => {
    if (err) {
      console.error('Error al verificar productos asociados:', err);
      res.status(500).send('Error al verificar productos asociados');//si ocurre algun error se imprime
      return;
    }
    if (result.length > 0) {
      res.json({ hasProducts: true });//si tiene productos asociados se pone en true
    } else {
      res.json({ hasProducts: false });//si tiene productos asociados se pone en false
    }
  });
});





app.listen(port, () => {//con esto corremos en el puerto que queremos la aplicacion del backend
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
