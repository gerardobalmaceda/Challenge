import express, { Request, Response, NextFunction, Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import conf from "../config";
import routes from "../api";
import ErrorCreator from "../services/helpers/errorCreator";
import ErrorHandler from "../api/controllers/errorHandler";

export default ({ app }: { app: Application }) => {
  /**
	 * Configuraciones de app
	 */
  app.use(morgan("dev"));
  app.enable("trust proxy");
  
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  
  // Middleware que transforma la cadena sin procesar de req.body en json
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  // Se carga las rutas API
  app.use(conf.api.prefix, routes());

  // Captura error cuando no se encuentra una ruta y se lo envía al error handler
  app.use((req, res, next) => {
    next(new ErrorCreator('ROUTE NOT FOUND', 404, false));
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use(
    (err: ErrorCreator, req: Request, res: Response, next: NextFunction) => {
      let error = {
        msg: err.msg,
        stCode: err.stCode,
        isInternal: err.isInternal,
      };
      if (!err.stCode) {
        error = ErrorHandler(err);
      }
      return res
        .status(error.stCode)
        .json({ error: error.msg, isInternal: error.isInternal });
    }
  );
};
