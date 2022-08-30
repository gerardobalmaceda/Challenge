import { errors } from "celebrate";
import { Router } from "express";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.post("/upload-csv");

  app.use(errors());
};
