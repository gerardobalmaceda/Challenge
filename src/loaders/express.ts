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
  app.use(morgan("dev"));
  app.enable("trust proxy");
  app.use(
    cors({
      credentials: true,
      origin: [
        conf.client.url,
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(conf.api.prefix, routes());

  app.use((req, res, next) => {
    next(new Error("Resource not found"));
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
