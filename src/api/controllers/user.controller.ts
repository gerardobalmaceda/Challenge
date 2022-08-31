import { Request, Response, NextFunction } from "express";
import * as UserServices from "../../services/user.service";

export const uploadCsv = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await UserServices.upalodCvs(req.file.path);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const exportUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await UserServices.exportUsers();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
