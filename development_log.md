# Development Log
Esta es una bitácora con detalles de desarrollo, en que documentación me base, en que guías, proyectos, etc.

## Inicio de la app Express
La idea general del servidor básico de express conectado a una base de datos PostgreSQL la tomé de mi proyecto personal [sacml-project](https://github.com/Devv1507/SACML_project), en donde realicé una aproximación similar basado en el stack PERN.

Parte de la razón es porque en su momento gaste gran cantidad de tiempo aprendiendo acerca del módulo Sequelize, el cuál es bastante flexive y práctico cuando se utiliza con su CLI (sequelize-cli). Sin embargo, debido a la necesidad de que esta API esté basada en Typescript, se presentaron varios problemas a la hora de utilizar las estrategias que antes había encontrado cómodas. En un principio intenté una aproximación basada en los cómandos base de sequelize-cli para generar plantillas para archivos de modelos, migración y configuración a la base de datos con los cómandos:

´´´
npx sequelize-cli init
npx sequelize model:generate --name User --attributes  name:string,email:string,password:string
npx sequelize model:generate --name Task --attributes  title:string,description:string,status:string,limitDate:date
´´´

El primero genera las carpetas /migration (donde se almacenan los archivos de migración, que automatizan el proceso de levantar/desmontar todas las tablas y asociaciones), /models (en donde se definen las relaciones entre tablas, métodos personalizados, entre otras opciones), /seed (donde se pueden subir plantillas para rellenar las tablas con datos de forma automatizada) y /config (para la configuración de la conexión). Los otros dos son comandos de ejemplo que genera archivos del tipo 'xxxx-create-user.js' en /migration y 'user.js' en /models. 

La particularidad es que este CLI genera los archivos en formato CommunJS, lo que me llevo a varios intentos fallidos de compatibilizar los archivos generados en .ts, siguiendo guías como (DEV)[https://dev.to/zipy/sequelize-and-typescript-integration-a-practical-tutorial-5ha3], (LogRocket)[https://blog.logrocket.com/using-sequelize-with-typescript/] o (StackOverFlow)[https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://stackoverflow.com/questions/65765429/using-sequelize-cli-with-typescript&ved=2ahUKEwj4zoSB4reHAxVYSjABHcFuABwQFnoECC4QAQ&usg=AOvVaw22WeojGWz9dN8s3UP9zrQh]. Desafortunadamente la propia (documentación de Sequelize referente a Typescrypt)[https://sequelize.org/docs/v6/other-topics/typescript/#usage] menciona como aún se está trabajando para integrar las funcionalidades del CLI. Por ello, decidí abandonar sequelize-cli y empezar con otros enfoques recomendados en guías de (Youtube)[https://www.youtube.com/watch?v=J8l21W9dEk4] o la propia documentación (en especial del módulo (sequelize-typescript)[https://www.npmjs.com/package/sequelize-typescript]), que terminaron en realidad siendo bastantes más prácticos y sencillos gracias a la facilidad de definir tipos basado en anotaciones @.

