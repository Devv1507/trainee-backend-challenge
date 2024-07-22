# Uses's Task Manegament System - Gestor de Tareas de Usuarios

## Descripción
REST API para gestión de tareas de usuarios con base en reto de prueba técnica.

![Arquitectura base de la REST API](/api-architecture.drawio.png)

## Arquitectura
La REST API está basada en un diseño MVC, con una organización específica de los directorios de los servicios (base de datos; e.g. /models) y controladores (manejo de peticiones HTTP; /controllers).

## Tecnologías

- Typescript
- Express Framework
- Autenticación basada en tokens
- Validación con Zod
- Comunicación con Postgres DB con Sequelice
- Documentación de end-points con Swagger

## Instalación localmente
```
npm run build
npm run dev
npm start
```

## Funcionamiento

### Funcionalidades

- [x] Leer todas las tareas personales (GET). http://example.com/api/tasks/all
- [x] Leer una tarea específica (GET). http://example.com/api/tasks/id=1
- [x] Añadir una tarea (POST). http://example.com/api/tasks/add
- [x] Actualizar una tarea (PUT). http://example.com/api/tasks/
- [x] orrar una tarea (DELETE). http://example.com/api/tasks/

### En PaaS Render
Para visitar el funcionamiento en producción visitar: [taskmanager.onrender.com](www.taskmanager.onrender.com)

### En Postman

![Sign Up](/media/signup_API.gif)