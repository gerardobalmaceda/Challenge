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

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await UserServices.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await UserServices.getAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await UserServices.update(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await UserServices.deleteUser(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
