import XLSX from "xlsx";
import { IUser } from "../interfaces/IUser";
import { userModel } from "../db/models/index";
import ErrorCreator from "./helpers/errorCreator";
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
      return new ErrorCreator(
        "Se produjo un error durante la carga, intentelo nuevamente por favor",
        500
      );
    }
    return dataToInsert;
  } catch (error) {
    throw error;
  }
};
