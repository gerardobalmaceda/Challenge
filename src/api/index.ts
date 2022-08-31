import { errors } from "celebrate";
import { Router } from "express";
// import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.routes";

export default () => {
  const app = Router();
  userRoute(app);

  app.use(errors());

  return app;
};
