import XLSX from "xlsx";
import { userModel } from "../db/models/index";
import ErrorCreator from "./helpers/errorCreator";
import { IUser } from "../interfaces/IUser";
import { calculateAge } from "./helpers/functions";
import { exportCsv } from "./helpers/uploader";
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
    return dataToReturn;
  } catch (error) {}
};
