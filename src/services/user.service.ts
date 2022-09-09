import mongoose, { Document } from "mongoose";
import { userModel } from "../db/models/index";
import ErrorCreator from "./helpers/errorCreator";
import { IUser, IUserUpload, IUserExport } from "../interfaces/IUser";
import { exportFile, upload } from "./helpers/fileManager";

/**
 * @param path  De la Request se obtiene el objeto file generado por el middleware multer en el cual una de sus key
 * contiene la ubicación del archivo subido.
 * @return Array de objetos con los usuarios insertados en la base de datos a partir del excel.
 */
export const uploadFile = async (path: string) => {
  try {
    let users: Partial<IUser>[] = [];
    const dataExcel = (await upload(path)) as any;
    await dataExcel.forEach(async (user: IUserUpload) => {
      users.push({
        nombre: user.Nombre,
        apellido: user.Apellido,
        legajo: user.Legajo,
        dni: user.DNI,
        gerencia: user.Gerencia,
        rol: user.Rol,
        dniJefe: user["DNI Jefe"],
        nacimiento: user["Fecha cumpleaños"],
        sector: user.Sector,
      });
    });
    users.forEach(async (user: Partial<IUser>) => {
      const validate = await userModel.findOne({
        $or: [{ dni: user.dni }, { legajo: user.legajo }],
      });
      if (validate) {
        await userModel.findOneAndUpdate(
          { $or: [{ dni: user.dni }, { legajo: user.legajo }] },
          user
        );
      } else {
        await userModel.create(user);
      }
    });
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * @param dni Del usuario a exportar.
 * @return Mensaje de éxito en caso de no haberse producido ningún error.
 */
export const exportUsers = async (dni: number) => {
  try {
    const users = await userModel.aggregate([
      {
        $match: {
          $or: [
            {
              dniJefe: dni,
            },
            {
              dni: dni,
            },
          ],
        },
      },
      {
        $lookup: {
          from: userModel.collection.name,
          localField: "dniJefe",
          foreignField: "dni",
          as: "superior",
        },
      },
    ]);
    if (!users.length) {
      throw new ErrorCreator(
        "No se encontro ningún usuario con el dni ingresado",
        400
      );
    }
    let usersExport: Partial<IUserExport>[] = [];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    users.forEach((user: Partial<IUser>) => {
      const birthday = user.nacimiento.split("/");
      let age = year - parseInt(birthday[2]);
      var birthDayMonth = month - parseInt(birthday[1]);

      if (
        birthDayMonth < 0 ||
        (birthDayMonth === 0 && day < parseInt(birthday[0]))
      ) {
        age--;
      }

      usersExport.push({
        "Apellido y Nombre": `${user.nombre} ${user.apellido}`,
        legajo: user.legajo,
        dni: user.dni,
        rol: user.rol,
        "Superior inmediato": `${user.superior[0]?.nombre || ""} ${
          user.superior[0]?.apellido || ""
        }`,
        gerencia: user.gerencia,
        sector: user.sector,
        edad: age,
      });
    });

    await exportFile(usersExport);

    return {
      message:
        "Email enviado con éxito, por favor controle su bandeja de entrada",
    };
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
    const validate = await userModel.findOne({
      $or: [{ dni: data.dni }, { legajo: data.legajo }],
    });

    if (validate) {
      throw new ErrorCreator(
        "El Dni o legajo ingresado ya se encuentra asociado a otro usuario",
        400
      );
    }
    const user = await userModel.create(data);
    return user;
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
    const validate = await userModel.findOne({
      $or: [{ dni: data.dni }, { legajo: data.legajo }],
    });
    if ((validate && validate._id == id) || !validate) {
      const update = await userModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(id),
        data,
        { new: true }
      );
      if (!update) {
        throw new ErrorCreator(
          "Se produjo un error al actualizar el usuario, verifique la información ingresada.",
          400
        );
      }
      return update;
    } else {
      throw new ErrorCreator(
        "El Dni o legajo que intenta actualizar ya se encuentra asociado a otro usuario",
        400
      );
    }
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
        "No se pudo eliminar el usuario, verifique los datos ingresados por favor",
        400
      );
    }
    return { message: "Usuario eliminado con éxito" };
  } catch (error) {
    throw error;
  }
};
