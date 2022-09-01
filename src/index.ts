import conf from "./config";
import express from "express";
import connection from "./db/connection";

/**
 * Se Crea la funcion encargada de inicializar el servidor express.
 * Luego se importa el archivo index.ts del directorio loaders el cual tiene la configuraciones que utilizara express.
 * El puerto en el que trabajará el servidor se lo pasa como variable de entorno.
 */
async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app.listen(conf.port, () => {
    console.log(`Service listening on port ${conf.port}`);
  });

  connection.database.on("connected", () => {
    console.log("Database connected");
  });
  connection.database.on("error", (e) => {
    console.log(e);
  });
}
const server = startServer();
