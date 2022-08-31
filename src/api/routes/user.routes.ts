import { errors } from "celebrate";
import { Router } from "express";
import { csvUploader } from "../../middlewares/uploader";
import * as UserController from "../controllers/user.controller";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.post("/", UserController.create);

  route.get("/", UserController.getAll);

  route.put("/:id", UserController.update);

  route.delete("/:id", UserController.deleteUser);

  route.post(
    "/upload-csv",
    csvUploader.single("data"),
    UserController.uploadCsv
  );

  route.get("/export", UserController.exportUsers);

  app.use(errors());
};
