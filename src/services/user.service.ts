import XLSX from "xlsx";
import fs from "fs";
import { userModel } from "../db/models/index";
import ErrorCreator from "./helpers/errorCreator";
import { IUser } from "../interfaces/IUser";
import { Document } from "mongoose";
import { globalAgent } from "https";
import { calculateAge } from "./helpers/functions";
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

export const exportUsers = async () => {
  try {
    const users = await userModel.find();
    let dataToReturn: Object[] = [];
    users.forEach(async (user: Partial<IUser>) => {
      let age = await calculateAge(user.nacimiento);
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
    return dataToReturn;
  } catch (error) {}
};

