import { errors } from "celebrate";
import { Router } from "express";
import userRoute from "./routes/user.routes";


/**
 * Se especifican al router de express las rutas que van a estar disponibles.
 */
export default () => {
  const app = Router();
  userRoute(app);

  app.use(errors());

  return app;
};
