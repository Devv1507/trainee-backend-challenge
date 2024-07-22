# Uses's Task Manegament System - Gestor de Tareas de Usuarios

## Descripción
REST API para gestión de tareas de usuarios con base en reto de prueba técnica.

![Arquitectura base de la REST API](/media/api-architecture.drawio.png)

Nota: los presentes iconos fueron tomados de la herramienta gratuita DrawIO.

## Arquitectura
La REST API está basada en un diseño MVC, con una organización específica de los directorios que habilitan el acceso a los datos de la base de datos (/models; que utiliza métodos de una instancia de Sequelize, que es un ORM o un mapeador que facilita la gestión de queries y comunicación con bases de datos relacionales) y controladores (manejo de peticiones HTTP y donde está la lógica de negocio; /controllers).

El flujo de datos de puede resumirse en el siguiente esquema:

![Flujo de datos general](/media/api-dataflow.png)

La base de datos recide en Render, lo que facilita que otros usuarios puedan probar este recurso sin necesidad a priori de tener un gestor de bases de datos local. Se utilizó el gestor de DBeaver para visualizar la base de datos y garantizar una correcta estructura de los datos.

La autenticación de usuarios se realiza por medio tokens de acceso y encriptación básica de las contraseñas con bcryptjs. La autorización también está basada en la revisión del encabezado de 'Authorization' de la petición HTTP. Para garantizar un flujo más flexible de esta autorización, y evitar que el usuario deba logearse cada 15 minutos, se añadió una lógica basada en tokens de refresco, la cuál se basa en el siguiente algoritmo:

![Flujo de lógica de token de refresco](/media/api-refresh-token-logic.png)

Además, cada vez que un usuario se logea se guarda el token de refresco también en la base de datos para tener una forma de garantizar cuando un token de refresco es válido, potenciando un poco más de seguridad a la hora de retornar tokens de acceso (estos últimos se supone que son eliminados de las cabeceras HTTP desde el frontend una vez el usuario cierra la sesión; es por ello que no se intentó aplicar más lógica respecto a ellos más allá de su pronta expiración).

## Más detalles
Para más información respecto a que documentación utilizada, preguntas realizadas a IA, dificultades u otras experiencias en el desarrollo de la API visitar el documento [Bitácora de Desarrolo / 'development_log'](https://github.com/Devv1507/trainee-backend-challenge/blob/main/development_log.md)

## Tecnologías

- Typescript
- Express Framework
- Autenticación basada en tokens JWT
- Validación con Zod
- Comunicación con Postgres DB con Sequelice
- Documentación de end-points con Swagger
- Despliegue en Render
- ~~Realización de pruebas unitarias para todos los end-points con Jest y Supertest~~

## Instalación localmente
Para correr la API localmente es necesario tener instalado el entorno NodeJS, ingresar al directorio donde se desea clonar el repositorio y abrir en dicha localización el Bash de Git:
```
git clone https://github.com/Devv1507/trainee-backend-challenge.git
```
Abrimos dicho directorio con nuestro IDE de preferencia y corremos el siguiente comando en la terminal (garantizando que estemos en la carpeta de origen del repositorio, e.g. your/pesonal/routes/trainee-backend-challenge):
```
npm i && npm run dev
```
Psdta: se requiere que el puerto 3000 no este ocupado o añadir una variable PORT al archivo de variables de ejecución .env. Este archivo se ha compartido de forma pública para gantizar la facilidad de uso de la API, pero será deshabilitado en un futuro.

## Funcionamiento
La presente REST API permite la gestión de tareas a partir de funciones CRUD básicas para un usuario autenticado, además también permite la realización de CRUD para usuarios. Pese a que este aspecto de los usuarios no fue denotado como uno de los objetivos del reto, considero que es imperativo garantizar un mínimo CRUD para la gestión de cualquier elemento que se cree en la base de datos.

Solo un usuario autenticado puede acceder a las rutas privadas del CRUD de tareas, a su vez, solo puede realizar cambios en sus datos privados gracias al uso de JWT tokens. 

### Funcionalidades
### Credenciales
- [x] Registrarse (POST). http://example.com/api/sign-up
- [x] Loguearse (POST). http://example.com/api/login
- [x] Cerrar sesión (GET). http://example.com/api/logout
- [x] Refrescar token (POST). http://example.com/api/refresh-token

### CRUD de tareas
- [x] Leer todas las tareas personales (GET). http://example.com/api/home/tasks/all
- [x] Leer una tarea específica (GET). http://example.com/api/tasks/:taskN
- [x] Añadir una tarea (POST). http://example.com/api/home/tasks/add
- [x] Actualizar una tarea (PUT). http://example.com/api/home/tasks/:taskN
- [x] Borrar una tarea (DELETE). http://example.com/api/home/tasks/:taskN

Nota: taskN no es el id per se de la tarea pero puede funcionar como tal gracias a que es una lista ordenada de números enteros desde 1 para cada usuario. Es decir, la tarea 1 de un usuario no va a ser igual a la tarea 1 de otro usuario.

### CRUD de usuarios
- [x] Leer los datos de todos los usuarios (GET). http://example.com/api/home/all
- [x] Leer los datos de una cuenta específica (GET). http://example.com/api/home/:id
- [x] Actualizar información de un usuario (PUT). http://example.com/api/home/:id
- [x] Eliminar a un usuario (DELETE). http://example.com/api/home/:id

Nota: estas funcionalidades del CRUD de usuarios solo pueden ser accedidas logueandose con las credenciales de: 
```
{
    "email": "localadmin@gmail.com",
    "password": "adminpassword"
}
```

### En PaaS Render
Para visitar el funcionamiento en producción visitar: [https://taskmanager-api-tw7t.onrender.com/api/docs](https://taskmanager-api-tw7t.onrender.com/api/docs). La única diferencia respecto al método local es que este ambiente de producción requiere utilizar archivos .js compatibles con el compilador del navegador web, que es la razón por la que existe la carpeta /dist.

### En Postman
Se realizó una colección en Postman con todas las rutas de la API para ser compartido con facilidad, por favor redigirse a dicha colección con el link compartido junto al video. En el presente repositorio también se añadió dicha colección en el archivo **API REST TaskManagement.postman_collection.json**, el cuál solo debe ser importado en Postman para tener una copia de la colección. Por otro lado, se expondrá brevemente el funcionamiento de end-points clave:

Nota: es necesario agregar manualmente el token de acceso para conseguir autorización a las rutas privadas (Bearer token). Esta tarea puede ser algo más fácil con la UI de Swagger.

* Probando el end-point de registro de usuario --> POST /api/sign-up
![Sign Up](/media/signup_API.gif)

* End-point de ingreso/autenticación --> POST /api/login
![Log In](/media/login-API.gif)

* End-point para añadir una tarea --> POST /api/home/tasks/add
![Add Task](/media/addTask.gif)

* End-point para buscar todas las tareas de un usuario --> GET /api/home/tasks/all
![Get All User Task](/media/getAllUserTasks.gif)

* End-point para buscar una tarea específica del usuario --> GET /api/home/tasks/:id
![Get Single Task](/media/getTaskById.gif)

* End-point para actualizar una tarea específica --> PUT /api/home/tasks/:id
![Update Task](/media/updateTask.gif)

* End-point para borrar una tarea específica --> DELETE /api/home/tasks/:id
![Delete Task](/media/deleteTask.gif)