import XLSX from "xlsx";
import mongoose from "mongoose";
import { userModel } from "../db/models/index";
import ErrorCreator from "./helpers/errorCreator";
import { IUser } from "../interfaces/IUser";
import { exportCsv } from "./helpers/uploader";

/**
 * @param path  De la Request se obtiene el objeto file generado por el middleware multer en el cual una de sus key
 * contiene la ubicación del archivo subido.
 * @return Array de objetos con los usuarios insertados en la base de datos a partir del excel.
 */
export const upalodCvs = async (path: string) => {
  try {
    const workBook = XLSX.readFile(path);
    const workBookSheets = workBook.SheetNames;
    const dataExcel = (await XLSX.utils.sheet_to_json(
      workBook.Sheets[workBookSheets[0]],
      { raw: false }
    )) as any;
    let dataToInsert: Object[] = [];
    dataExcel.forEach(
      (element: {
        Nombre: String;
        Apellido: String;
        Legajo: String;
        DNI: number;
        Rol: String;
        Gerencia: String;
        Sector: String;
        "DNI Jefe": String;
        "Fecha cumpleaños": String;
      }) => {
        dataToInsert.push({
          nombre: element.Nombre,
          apellido: element.Apellido,
          legajo: element.Legajo,
          dni: element.DNI,
          gerencia: element.Gerencia,
          rol: element.Rol,
          dniJefe: element["DNI Jefe"],
          nacimiento: element["Fecha cumpleaños"],
          sector: element.Sector,
        });
      }
    );
    const data = await userModel.insertMany(dataToInsert);
    if (!data) {
      throw new ErrorCreator(
        "Se produjo un error durante la carga, intentelo nuevamente por favor",
        500
      );
    }
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @return Mensaje de éxito en caso de no haberse producido ningún error.
 */
export const exportUsers = async () => {
  try {
    const users = await userModel.find();
    let dataToReturn: Object[] = [];
    users.forEach((user: Partial<IUser>) => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const birtdayYear = user.nacimiento.split("/");
      let age = year - parseInt(birtdayYear[2]);
      var birthDayMont = month - parseInt(birtdayYear[1]);

      if (
        birthDayMont < 0 ||
        (birthDayMont === 0 && day < parseInt(birtdayYear[0]))
      ) {
        age--;
      }
      dataToReturn.push({
        "Apellido y Nombre": `${user.nombre} ${user.apellido}`,
        legajo: user.legajo,
        dni: user.dni,
        rol: user.rol,
        gerencia: user.gerencia,
        sector: user.sector,
        edad: age,
      });
    });
    await exportCsv(dataToReturn);
    return "Email enviado con éxito, por favor controle su bandeja de entrada";
  } catch (error) {
    throw error;
  }
};

/**
 * @param data Objeto con los datos a ingresar en la base de datos del usuario a crear.
 * @return Objeto con la información del usuario insertado en la base de datos
 */
export const create = async (data: Partial<IUser>) => {
  try {
    const createUser = await userModel.create(data);
    if (!createUser) {
      throw new ErrorCreator(
        "Se produjo un error al crear el usuario, intentelo nuevamente por favor.",
        500
      );
    }
    return createUser;
  } catch (error) {
    throw error;
  }
};

/**
 * 
 * @return Array de objetos con los usuarios existentes en la base de datos.
 */
export const getAll = async () => {
  try {
    const data = await userModel.find();
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @param id Mongo Id del usuario a actualizar.
 * @param data Objeto con la información a actualizar del usuario.
 * @returns Objeto con la información del usuario actualizada.
 */
export const update = async (id: string, data: Partial<IUser>) => {
  try {
    const update = await userModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(id),
      data,
      { new: true }
    );
    return update;
  } catch (error) {
    throw error;
  }
};

/**
 * @param id Mongo Id del usuario a actualizar.
 * @returns Mensaje de éxito en caso de no haberse producido ningún error. 
 */
export const deleteUser = async (id: string) => {
  try {
    const update = await userModel.findByIdAndDelete(
      mongoose.Types.ObjectId(id)
    );
    if (!update) {
      throw new ErrorCreator(
        "No se puedo eliminar el usuario, verifique los datos ingresados por favor",
        404
      );
    }
    return "Usuario eliminado con éxito";
  } catch (error) {
    throw error;
  }
};
