# Development Log
Esta es una bitácora con detalles de desarrollo de la presente API. 

**Resumen**: me base principalmente en documentación y proyectos de guías/creadores de contenido de DEV, LogRocket, FullStackFoundation, Medium, StackOverFlow y tutoriales de Youtube, especialmente para aprender la configuración necesaria para desarrollar la API en Typescript. Utilicé un diseño MVC algo incompleto (sin capa de servicios) junto a un sistema de autorización basado en tokens de refresco/acesso y autenticación basada en encriptación/desencriptación de credenciales. Además, se añadió lógica básica para segregar la CRUD de usuarios solo a un superusuario específico. Tuve dificultades principalmente en problemas de errores de compilación basado en Typescript (incompatibilidad de tipos), en aprender  a usar el módulo sequelize-typescript, en aprender como describir los endpoints con base en Swagger JSDoc y en definir prubeas unitarias. 

## Inicio de la app Express
La idea general del servidor básico de Express conectado a PostgreSQL la tomé de mi proyecto personal (sacml-project)(https://github.com/Devv1507/SACML_project), en donde realicé una aproximación similar basado en el stack PERN.

Debido a mi poca familiaridad con Typescript, empecé documentandome acerca de ¿cómo desplegar una REST API utilizando .ts? Para mi sorpresa, es bastante similar a utilizar la sintaxis de ES6 en este tipo de proyectos NodeJS o React, salvo la necesidad de definir estrictamente los tipos de los parámetros o el prototipo de un objeto que se pase a una función/clase, similar a Java. 

En las primeras fases de la conversión de CommonJS a TS (en un principio empecé una estructura basada en .js para luego convertirla en .ts porque pensé que ahorraría más tiempo de tal forma) instale paquetes útiles y que se usan bastante en este tipo de proyectos PERN como: 
```
npm init -y
npm i express, bcryptjs, dotenv, jsonwebtoken, sequelize, pg, uuid, nodemon, zod

```
Y posteriormente también se añadieron:
```
npm i swagger-ui-express swagger-jsdoc, cookie-parser
```
También, tras revisar algunas guías/creadores de contenido como [FaztCode](https://www.youtube.com/@FaztCode), [Dave Gray](https://www.youtube.com/@DaveGrayTeachesCode), [LogRocket](https://blog.logrocket.com/how-to-set-up-node-typescript-express/), etc; instale los comandos necesarios para desarrollar una API Express basada en Typescript:
```
npm i -D typescript, @types/express, @types/node, ts-node, @types/bcryptjs, @types/cookie-parser, @types/cors, @types/jsonwebtoken, @types/jsonwebtoken, @types/uuid
```
Usando la estrategia base de empezar el archivo de configuración 'tsconfig.json' con el comando:
```
npx tsc --init
```
## Lógica de negocio
La mayoría de la lógica del negocio recae en los controladores: toman las peticiones HTTP; desestructuran los objetos JSON para leer los datos de entrada; realizan validaciones con los modelos que actuán como  instancias de Sequelize, y por tanto, permiten utilizar métodos generales (como findOne, findByPk, create, update, destroy) que facilitan la realización de queries en lenguaje SQL. Finalmente, una vez se alcanza el final de la estructura de control se retorna la respuesta HTTP correspondiente, sea un exito (200, 201) o rechazo (400, 401, 403, 404).

Para la lógica de autorización basada en tokens de acceso/refreso me base en guías bastante completas como las de [FullStackFoundation](https://www.fullstackfoundations.com/blog/passport-jwt) y [Dave Gray](https://www.youtube.com/watch?v=f2EqECiTBL8&t=15338s).

## Arquitectura MVC
Debido a la naturaleza no dogmática del framework Express, por lo que he visto es natural que muchos proyectos de desarrollo web utilicen una organización bastante personalizadas. A su vez, el diseño de Modelo-Vista-Controlador (MVC) es muy popular en el área de desarrollo de aplicaciones web. Y en parte, también por su facilidad de estructura:

![Diseño MVC](/media/1_y8Z4MgBS_s8d4o26arDJ4w.png)
Tomado de https://medium.com/@sadikarahmantanisha/the-mvc-architecture-97d47e071eb2 

Como podemos ver en la imagen, lo que intentamos con un diseño MVC no es solo referente a la organización de las carpetas, sino también a la lógica y funcionalidad general. En este diseño se busca separar la comunicación entre la base de datos y el cliente (métodos HTTP) a partir de las capas de enrutadores, controladores y servicios. Empezando por el lado del cliente, los enrutadores son archivos en donde se han definido los end-points y middlewares necesarios para cada ruta particular (e.g. la ruta /api/home/tasks es privada y por ello en los enrutadores se importan middlewares para validar la autorización a estos recursos), en donde reciben las peticiones del cliente a tráves del Router de Express. 

Estas rutas llaman a funciones en donde que manejan todas las peticiones/respuestas HTTP, es decir, controladores. Estos controladores realizan operaciones que normalmente se reciben a tráves de una capa de servicios o métodos en donde se despliega la lógica del negocio y la comunicación más cercana con la DB. En este caso, los controladores definidos llaman directamente a la capa de acceso a los datos (los modelos, como user.ts o task.ts) y emplean funcionalidades de Sequelize para comprobar, actualizar o destruir datos de la DB; añadir la lógica de CRUD y adjuntar respuestas HTTP al cliente con base en estructuras de control.

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

## Documentación
Como no había utilizado antes el módulo de Swagger o aplicado plenamente comentarios tipo JSDoc tuve que recorrer una pequeña curva de aprendizaje. Por suerte, la documentación de [Swagger](https://swagger.io/docs/specification/describing-responses/), respecto a como describir respuestas, cuerpos de peticiones, modelos de datos, parámetros, etc. es bastante completa. Lo que facilitó este proceso.

## Validación
Utilicé Zod para la validación de los datos de las peticiones de usuario, pues considero que es módulo bastante cómodo de usar y su [documentación](https://zod.dev/) es bastante completa y con muchos ejemplos prácticos.

## Uso de IA: ChatGPT
Utilicé esta tecnología en ocasiones en donde estaba bloqueado o no encontraba soluciones a un error particular. Aunque en muchas ocasiones no conseguí una respuesta satisfactoria o que me ayudará plenamente a resolver un bug. Entre los casos que utilicé está tecnología están:

* Tuve un problema particular para la ruta get /api/tasks/, en donde se supone podría obtener todas las tareas de un usuario autenticado, sin embargo, a pesar de que todas las otras rutas funcionaban bien respecto al middleware de autorización, al realizar peticiones a esta ruta siempre obtenía un error 404, que no tenía sentido pues veía por consola como el usuario era encontrado. Así que decidí preguntar a ChatGPT lo siguiente:

```
 I have a malfunction on this middleware, where I can see the userFound constant in console, but I recive a 404 response with "Usuario no encontrado". Can you help to find why this happens? My middleware to validate access token have this structure: 

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: 'No se ha encontrado token de autenticación'});
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    console.log(decoded);
    const { sub } = decoded;
    const userFound = await User.findByPk(sub, {
      attributes: {
        exclude: ['email','refreshToken','password'],
      }
    });
    console.log(userFound?.dataValues);
    if (!userFound) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // I fall here, when I shouldn't
    }
    // ...
```
A lo que ChatGPT respondió:
```
The issue you're facing is likely due to the asynchronous nature of the User.findByPk call within the callback of jwt.verify. If the userFound is indeed being logged in the console but you're still getting a 404 response, it's possible that there's a timing or scoping issue.

To ensure proper handling, let's make sure we're handling all asynchronous operations correctly. Here's an updated version of your middleware:

typescript

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/models/user';

// Define custom middleware function to handle unauthorized requests
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: 'No se ha encontrado token de autenticación' });
  }
  
  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
      const { sub } = decoded;
      const userFound = await User.findByPk(sub, {
        attributes: {
          exclude: ['email', 'refreshToken', 'password'],
        },
      });
      console.log(userFound?.dataValues);
      
      if (!userFound) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Continue to the next middleware or route handler if authorized
      res.locals.userId = sub;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  });
};

Key Changes and Additions:

    Async/Await Handling: The User.findByPk call is now wrapped in an async function, ensuring that the asynchronous operation is handled correctly.
    Try/Catch Block: Added a try/catch block around the asynchronous database call to catch and handle any potential errors.
    Consistent Response Handling: Ensured that any paths returning a response do so explicitly, avoiding situations where execution might continue unexpectedly.

By wrapping the User.findByPk call in a try/catch block, you can ensure that any errors thrown by this asynchronous operation are properly caught and handled, preventing unexpected behavior and ensuring that your middleware logic flows as intended.

This should help you diagnose the issue more effectively and ensure that the userFound check behaves as expected.
```
Lo cuál no tenía sentido y no solucionaba el bug, tras buscar en foros en StarOverFlow y similares encontré un comentario que mencionaba como alguien tenía un bug similar y lo solucionó añadiendo más información a la ruta, pasando del end-point /app/tasks a /app/tasks/all.


* Otro problema que tuve fue en el período de expiración de un token de acceso, que no estaba venciendose a pesar de que setee el tiempo a 30 segundos. Por tanto pregunte a ChatGPT:
```

I'm making a token-based authentication system for my REST API with passport-jwt, but I expected the token to expire in 1 minute to prove its temporality it's working, when I create the token I used this function:

export const assignJWT = async (user: { id: string}, secret: string, time: string) => {

    const payload = {
      sub: user.id,
      iat: Date.now(),
    };
  
    const token = await jwt.sign(
        payload,
        secret,
        {expiresIn: time}
    );
    return token;
};

and I set my authentication token to expires in a minute. But when I prove the endpoints, it doesn't working in that way. Can you have any idea what's happening?
```

En este caso la IA si me brindo una respuesta satisfacoria en donde me indicó que estaba pasando mal el parámetro de la fecha de creación, que era requerido en milisegundos y lo estaba pasando en segundos, lo que probablemente lleva a un problema en donde la fecha de expiración nunca expire.
```
The iat (issued at) claim in the JWT payload represents the time at which the token was issued, expressed in seconds since the Epoch (1970-01-01T00:00:00Z UTC). In your assignJWT function, you are using Date.now(), which returns the current time in milliseconds since the Epoch. This discrepancy between milliseconds and seconds may be causing issues with the token's expiration.

The expiresIn option in the jwt.sign function is responsible for setting the token's expiration time. If the iat claim is in milliseconds while expiresIn expects the expiration time in seconds, it can lead to unexpected behavior.

Here is the corrected assignJWT function where the iat claim is correctly set in seconds:

typescript

import jwt from 'jsonwebtoken';

export const assignJWT = async (user: { id: string }, secret: string, time: string) => {
  const payload = {
    sub: user.id,
    iat: Math.floor(Date.now() / 1000), // iat in seconds
  };

  const token = await jwt.sign(payload, secret, { expiresIn: time });
  return token;
};

Make sure the JWT middleware is properly applied to the routes you want to protect. Also, ensure the secretOrKey matches the secret used to sign the token.
Testing Token Expiration

You can test the expiration of the token by setting time to 60s (1 minute) and using the checkIfAuthorized middleware in your route. After 1 minute, the token should be invalid and the middleware should respond with a 403 status code.

Here's an example of a protected route:

typescript

import express from 'express';
import { checkIfAuthorized } from './path-to-your-middleware';

const router = express.Router();

router.get('/protected', checkIfAuthorized, (req, res) => {
  res.json({ message: 'You have access to this protected route', user: res.locals.userData });
});

export default router;

With these changes, your token-based authentication should respect the expiration time and correctly invalidate tokens after 1 minute.
```

* También realicé preguntas que no entendía la procedencia del problema, y estaba más relacionado con el tipado estricto de Typescript. Por ejemplo:
```
I have a problem with a Sequelize model file, where I try to hash the password in a automatic form with a custom function encryptPassword, like this:

import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasMany
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

@Table({
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
})
// .....
@BeforeCreate
  static async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }
}

export default User


But I get this error:

Error: Illegal arguments: object, string
    at _async (C:\Users\beyon\Documents\Proyectos\trainee-backend-challenge\node_modules\bcryptjs\dist\bcrypt.js:214:46)
    at C:\Users\beyon\Documents\Proyectos\trainee-backend-challenge\node_modules\bcryptjs\dist\bcrypt.js:223:17
    at new Promise (<anonymous>)
    at Object.bcrypt.hash (C:\Users\beyon\Documents\Proyectos\trainee-backend-challenge\node_modules\bcryptjs\dist\bcrypt.js:222:20)
    at Function.<anonymous> (C:\Users\beyon\Documents\Proyectos\trainee-backend-challenge\src\models\user.ts:59:29)
    at Generator.next (<anonymous>)
    at fulfilled (C:\Users\beyon\Documents\Proyectos\trainee-backend-challenge\src\models\user.ts:14:58)

Can you help me find the problem?
```
Y la respuesta que obtuve fue también me permitió solucionarlo:
```
The error you're encountering, Illegal arguments: object, string, indicates that there is an issue with the arguments passed to the bcrypt hash function. This usually happens when the data passed to hash is not of the expected type.

In your case, the issue stems from how the password is being handled in the @BeforeCreate hook. The BeforeCreate hook receives an instance of the model as its argument, not the individual fields.

Here is the corrected version of your model:

typescript

import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

@Table({
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  // Encrypt the password before creating the user
  @BeforeCreate
  static async encryptPassword(user: User) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
}

export default User;

Key Changes:

    The @BeforeCreate hook now receives an instance of User and accesses the password through user.password.
    The hook modifies the user.password property directly.

This ensures that the correct User instance is being passed and the password is correctly hashed before the user is created.
```
## Testing: Pruebas unitarias
A pesar de que he tenido que realizar algunas pruebas unitarias en proyectos académicos, la realidad es que no tengo mucha familiaridad con las mismas, en especial cuando se requiere tener una versión en memoria de la base de datos como este caso. En un principio esperaba realizar estos test con Jest y Supertest, pero decidí dejar este aspecto incompleto porque noté que la curva de aprendizaje que necesitaba superar no me permitiría entregar a tiempo.