import { errors } from "celebrate";
import { Router } from "express";
import { csvUploader } from "../../middlewares/uploader";
import * as UserController from "../controllers/user.controller";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.post(
    "/upload-csv",
    csvUploader.single("data"),
    UserController.uploadCsv
  );

  app.use(errors());
};
