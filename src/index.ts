import conf from "./config";
import express from "express";
import connection from "./db/connection";

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
