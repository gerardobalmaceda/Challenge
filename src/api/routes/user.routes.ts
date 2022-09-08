import { errors } from "celebrate";
import { Router } from "express";
import { celebrate } from "celebrate";
import { fileUploader } from "../../middlewares/uploader";
import * as UserController from "../controllers/user.controller";
import { id_mongo_params, user_schema, dni_to_export } from "../validations";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.post(
    "/",
    celebrate({
      body: user_schema,
    }),
    UserController.create
  );

  route.get("/", UserController.getAll);

  route.put(
    "/:id",
    celebrate({
      params: id_mongo_params,
    }),
    UserController.update
  );

  route.delete(
    "/:id",
    celebrate({
      params: id_mongo_params,
    }),
    UserController.deleteUser
  );

  route.post("/upload", fileUploader.single("data"), UserController.uploadFile);

  route.post(
    "/export/:dni",
    celebrate({
      params: dni_to_export,
    }),
    UserController.exportUsers
  );

  app.use(errors());
};
