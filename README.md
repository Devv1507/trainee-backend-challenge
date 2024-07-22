# Uses's Task Manegament System - Gestor de Tareas de Usuarios

## Descripción
REST API para gestión de tareas de usuarios con base en reto de prueba técnica.

![Arquitectura base de la REST API](/media/api-architecture.drawio.png)

## Arquitectura
La REST API está basada en un diseño MVC, con una organización específica de los directorios con acceso a los datos de la base de datos (/models; aunque esto es gestionado principalmente por las funcionalidades del módulo de Sequelice) y controladores (manejo de peticiones HTTP; /controllers).

El flujo de datos de puede resumirse en el siguiente esquema:

La base de datos recide en Render, lo que facilita que otros usuarios puedan probar este recurso sin necesidad a priori de tener un gestor de bases de datos local. Se utilizó el gestor de DBeaver para visualizar la base de datos y garantizar una correcta estructura de los datos.

## Tecnologías

- Typescript
- Express Framework
- Autenticación basada en tokens JWT
- Validación con Zod
- Comunicación con Postgres DB con Sequelice
- Documentación de end-points con Swagger

## Instalación localmente
Para correr la API localmente es necesario tener instalado el entorno NodeJS, clonar el presente repositorio:
```
git clone https://github.com/Devv1507/trainee-backend-challenge.git
```
Y correr el comando:
```
npm run dev
```
Psdta: se requiere que el puerto 3000 no este ocupado o añadir una variable PORT al archivo de variables de ejecución .env. Este archivo se ha compartido de forma pública para gantizar la facilidad de uso de la API.

## Funcionamiento
La presente REST API permite la gestión de tareas a partir de funciones CRUD básicas para un usuario autenticado, además también permite la realización de CRUD para usuarios. Pese a que este aspecto de los usuarios no fue denotado como uno de los objetivos del reto, considero que es imperativo garantizar un mínimo CRUD para la gestión de cualquier elemento que se cree en la base de datos.

### Funcionalidades

- [x] Leer todas las tareas personales (GET). http://example.com/api/tasks/all
- [x] Leer una tarea específica (GET). http://example.com/api/tasks/id=1
- [x] Añadir una tarea (POST). http://example.com/api/tasks/add
- [x] Actualizar una tarea (PUT). http://example.com/api/tasks/
- [x] Borrar una tarea (DELETE). http://example.com/api/tasks/

### En PaaS Render
Para visitar el funcionamiento en producción visitar: [taskmanager.onrender.com](www.taskmanager.onrender.com)

### En Postman
A pesar de que SwaggerUI y ThunderClient realizan funcionalidades muy similares, que suelo usar con más frecuencia, se realizó una colección con todas las rutas de la API para ser compartido con facilidad ().

* Probando el end-point de registro de usuario /api/sign-up
![Sign Up](/media/signup_API.gif)

* Probando el end-point de ingreso/autenticación /api/sign-up
