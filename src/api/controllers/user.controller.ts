import { Request, Response, NextFunction } from "express";
import * as UserServices from "../../services/user.service";


/**
 *
 * @param  path De la Request se obtiene el objeto file generado por el middleware multer en el cual una de sus key
 * contiene la ubicación del archivo subido.
 * @return En caso de éxito un json con la información obtenieda del excel con el códido de respuesta HTTP 201
 */
export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await UserServices.uploadFile(req.file.path);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @return En caso de éxito un json con un mensaje de éxito.
 */
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

/**
 *
 * @params Del Body se obtiene un json con los datos del usuarios a crear en la base de datos
 * @return En caso de éxito se retorna un json la información del nuevo usuario y el código HTTP 201.
 */
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

/**
 *
 * @return Json que contiene un array de objetos con información de todos los usuarios de la base de datos.
 */
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

/**
 * @param id De los parametros envíados en la Request se obtiene el id del usuario a actualizar.
 * @params Del body se obtiene la información a actualizar del usuario.
 * @return Json que contiene la información actualizada del usuario.
 */
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

/**
 * @param id De los parametros envíados en la Request se obtiene el id del usuario a eliminar.
 * @return Json con mensaje de éxito.
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await UserServices.deleteUser(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
