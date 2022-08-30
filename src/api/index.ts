import { errors } from "celebrate";
import { Router } from "express";
// import authRoute from "./routes/auth.route";
// import userRoute from "./routes/user.route";

export default () => {
  const app = Router();

//   authRoute(app);
//   userRoute(app);
  app.use(errors());

  return app;
};
