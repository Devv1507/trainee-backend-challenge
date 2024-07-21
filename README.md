# Uses's Task Manegament System - Gestor de Tareas de Usuarios

## Descripción
REST API para gestión de tareas de usuarios con base en reto de prueba técnica.

![Arquitectura base de la REST API](/api-architecture.drawio.png)

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

## Arquitectura
La REST API está basada en un diseño MVC, con una organización específica de los directorios de los servicios (base de datos; e.g. /models) y controladores (manejo de peticiones HTTP; /controllers).

## Funcionamiento
### En SaaS Render
Para visitar el funcionamiento en producción visitar: [taskmanager.onrender.com](www.taskmanager.onrender.com)

### En Postman

