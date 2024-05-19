----------------------------------------------------------------- MANUAL DE INSTALACION -----------------------------------------------------------------
Para poder correr esta aplicacion de inventario deberas realizar los siguiente pasos que te indicaremos acontinuacion:
  limk del repositorio --> https://github.com/Davidshtp/APP_INVENTARIO.git
1. Descargar sqlyog para el manejo de las bases de datos adjunto link de descarga -->https://sqlyog.softonic.com/?ex=RAMP-2046.2
2. Una vez descargado e instalado procedemos a hacer una nueva conexion adjunto video de instalacion y de como crear la conexion --> https://www.youtube.com/watch?v=aa9k9SvruG0
IMPORTANTE ponerle donde dice 
username: INVENTARIO
password: la que quieran 

3. Una vez entren importan la base de datos que esta en la carpeta que dice "Base de datos" video de como hacerlo -->https://www.youtube.com/watch?v=sZIT6E-maXQ

4. Descargar Visual Studio Code para poder ejecutar el codigo de la aplicacion --> https://code.visualstudio.com

5. Una vez descargado tendras que importar la carpeta de la aplicacion al programa *adjunto video de como importar una carpeta dentro de Visual Studio Code* --> https://www.youtube.com/watch?v=9VLRqNnbEF4

6. Una vez tengamos importada la carpeta en el Visual Studio Code y miremos la estructura de la app *son varios archivos* procederemos a descargar el Xampp 
adjunto lik para descarga --> https://www.apachefriends.org/es/index.html 
Descargaremos el Xampp y lo instalaremos, cuando este instalado abriremos el xammp y le daremos a start a "mysql" 

7. Una vez hecho esto volveremos a Visual Studio Code e iremos a la carpeta llamada "Backend" una vez estemos alli abriremos el archivo llamado "index.js" una vez veamos el codigo de ese archivo
procederemos a modificar lo siguiente del codigo
    //de esta manera conectamos la base de datos al backend
const db = mysql.createConnection({
  host: 'localhost',
  user: 'INVENTARIO',
  password: '',<--- aqui ponen la contraseña que colocaron en el sqylog
  database: 'inventario'<---este es el nombre de la base de datos que importaron debe ser igual
});

 luego de eso hacer la siguiente combinacion de teclas para abrir la terminal "CTRL + ñ" 
nos debe aparecer algo asi:
PS C:\Users\david\OneDrive\Documentos\emprendimiento>
eso quiere decir que estamos en la carpeta de emprendimiento en el proyecto si te aparece asi vas bien!!!
una vez diga eso escribiremos alli mismo lo siguiente 
"cd Backend"
al dar enter nos debe salir algo asi que quiere decir que estamos dentro de la carpeta Backend del proyecto
PS C:\Users\david\OneDrive\Documentos\emprendimiento\Backend> 
ahi mismo ingresaremos el siguiente comando y daremos enter
"node index.js"
nos debe aparecer esto si vas bien!!
PS C:\Users\david\OneDrive\Documentos\emprendimiento> cd Backend
PS C:\Users\david\OneDrive\Documentos\emprendimiento\Backend> node index.js
Servidor Express corriendo en el puerto 5000
Conexión a la base de datos establecida
quiere decir que ya estamos conectados a la base de datos

8. posteriormente a eso agregaremos una nueva terminal dandole al icono de + que hay en la terminal
volveremos al inicio que es algo asi:
PS C:\Users\david\OneDrive\Documentos\emprendimiento>
esta vez vamos a aplicar el siguiente comando y daremos enter
"cd src"
nos debe salir asi:
PS C:\Users\david\OneDrive\Documentos\emprendimiento\src> 
lo siguiente es copiar el siguiente comando y dar enter
"npm start"
asi iniciamos la app y se nos abrirar una pestaña en el navegador ya con la aplicacion
nos debe aparecer algo asi:
Compiled successfully!

You can now view emprendimiento in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.28.96.1:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully




YA ESTA!!!
ahora puedes registrarte y  posteriormente loguiarte para poder empezar a usar la aplicacion!!!
:)
recuerda que luego de hacer todos estos pasos si quieres volver a abrir la app
solo tienes que activar el mysql del xampp
y abrir la consola y poner los comandos que te enseñe arriba
eso es todo!!!!

creditos: Al grupo de desarrolladores de desarrollo de software grupo b 3r semestre del Instituto Tecnologico Del Putumayo
