# Development Log
Esta es una bitácora con detalles de desarrollo, en que documentación me base, en que guías, proyectos, etc.

## Inicio de la app Express
La idea general del servidor básico de express conectado a una base de datos PostgreSQL la tomé de mi proyecto personal (sacml-project)(https://github.com/Devv1507/SACML_project), en donde realicé una aproximación similar basado en el stack PERN.

Debido a mi poca familiaridad con Typescript, empecé documentandome acerca de ¿cómo desplegar una REST API utilizando .ts? Para mi sorpresa, es bastante similar a utilizar la sintaxis de ES6 en este tipo de proyectos NodeJS o React, salvo la necesidad de definir estrictamente los tipos de los parámetros o el prototipo de un objeto que se pase a una función/clase, similar a Java. En las primeras fases de la conversión de CommonJS a TS (en un principio empecé una estructura basada en .js para luego convertirla en .ts porque pensé que ahorraría más tiempo así) instale paquetes útiles y que se usan bastante en este tipo de proyectos PERN como: 
```
npm i express, bcryptjs, dotenv, jsonwebtoken, sequelize, pg, uuid, nodemon
```
También, tras revisar algunas guías de [FaztCode](), [LogRocket](https://blog.logrocket.com/how-to-set-up-node-typescript-express/), instale los comandos necesarios para el desarrollo:
```
npm i -D typescript, @types/express, @types/node, ts-node
```
Posteriormente intalé los tipos @types correspondientes a librerías requeridas, como:
```
npm i -D @types/bcryptjs, @types/cookie-parser, @types/cors, @types/jsonwebtoken, @types/jsonwebtoken, @types/uuid
```



## Módulo Sequelize
El uso de esté módulo se atribuye principalmente a la familiaridad que ya tenía, en parte me gusta por su flexivilidad y automatización cuando se utiliza con su CLI (sequelize-cli). Sin embargo, debido a la necesidad de que esta API esté basada en Typescript, se presentaron varios problemas a la hora de utilizar las estrategias que antes había encontrado cómodas. En un principio intenté una aproximación basada en los cómandos base de sequelize-cli para generar plantillas para archivos de modelos, migración y configuración a la base de datos:

```
npx sequelize-cli init
npx sequelize model:generate --name User --attributes  name:string,email:string,password:string
npx sequelize model:generate --name Task --attributes  title:string,description:string,status:string,limitDate:date
```

El primero genera las carpetas: /migration (donde se almacenan los archivos de migración, que automatizan el proceso de levantar/desmontar todas las tablas y asociaciones), /models (en donde se definen las relaciones entre tablas, métodos personalizados, entre otras opciones), /seed (donde se pueden subir plantillas para rellenar las tablas con datos de forma automatizada) y /config (para la configuración de la conexión). Los otros dos son comandos de ejemplo que generan archivos del tipo 'xxxx-create-user.js' en /migration y 'user.js' en /models, a modo de plantillas que solo deben personalizarse al gusto del desarrollador. 

La particularidad es que este CLI genera los archivos en formato CommunJS, lo que me llevo a varios intentos fallidos de compatibilizar los archivos generados .js a .ts, siguiendo guías como [DEV](https://dev.to/zipy/sequelize-and-typescript-integration-a-practical-tutorial-5ha3), [LogRocket](https://blog.logrocket.com/using-sequelize-with-typescript/) o [StackOverFlow](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://stackoverflow.com/questions/65765429/using-sequelize-cli-with-typescript&ved=2ahUKEwj4zoSB4reHAxVYSjABHcFuABwQFnoECC4QAQ&usg=AOvVaw22WeojGWz9dN8s3UP9zrQh). Desafortunadamente la propia [documentación de Sequelize referente a Typescrypt](https://sequelize.org/docs/v6/other-topics/typescript/#usage) menciona parcialmente que aún se está trabajando para integrar las funcionalidades del CLI. Por ello, decidí abandonar sequelize-cli y empezar con otros enfoques recomendados en guías de [Youtube](https://www.youtube.com/watch?v=J8l21W9dEk4) o la propia documentación (en especial del módulo [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)), que terminaron en realidad siendo bastantes más compactos y sencillos gracias a la facilidad de definir tipos basado en anotaciones @, por ejemplo, una columna puede ser definida solo importando la interfaz Column de sequelize-typescript y utilizandola de forma similar:
```
@Column({
    type: DataType.STRING,
    allowNull: false,
})
declare name: string; // o !name
```

## Arquitectura MVC
Debido a la naturaleza unopinonated del framework Express, por lo que he visto es natural que muchos proyectos de desarrollo web utilicen una organización bastante personalizada. A pesar de que sé que existen arquitecturas más limpias (como la arquitectura de puertos-adaptadores de Alistair Cockburn), considero que MVC sigue siendo uno d elos estándares más populares para el desarrollo web y especialmente para un proyecto pequeño como el presente.


Como podemos ver en la imagen, lo que intentamos con un diseño MVC no es solo referente a la organización de las carpetas, sino también a la lógica y funcionalidad general. En este diseño se busca separar la comunicación entre la base de datos y el cliente (métodos HTTP) a partir de las capas de enrutadores, controladores y servicios. Empezando por el lado del cliente, los enrutadores son archivos en donde se han definido los end-points y middlewares necesarios para cada ruta particular (e.g. la ruta /api/home/tasks es privada y por ello en los enrutadores se importan middlewares para validar la autorización a estos recursos), en donde reciben las peticiones del cliente a tráves del Router de Express. 

Estas rutas llaman a funciones en donde que manejan todas las peticiones/respuestas HTTP, es decir, controladores. Estos controladores realizan operaciones que normalmente se reciben a tráves de una capa de servicios o métodos en donde se despliega la lógica del negocio y la comunicación más cercana con la DB. En este caso, se optó por un modelo MVC más simple por la simplicidad del reto. Es por ello que los controladores definidos llaman directamente a la capa de acceso a los datos (los modelos, como user.ts o task.ts) y emplean funcionalidades de Sequelize para comprobar, actualizar o destruir datos de la DB; añadir la lógica de CRUD y adjuntar respuestas HTTP al cliente con base en estructuras de control.





[documentación de Zod](https://zod.dev/)