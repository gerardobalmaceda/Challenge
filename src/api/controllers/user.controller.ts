import { Request, Response, NextFunction } from "express";
import * as UserServices from "../../services/user.service";
export const uploadCsv = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await UserServices.upalodCvs(req.file.path);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
