import XLSX from "xlsx";
import sgMail from "@sendgrid/mail";
import fs from "fs";
import conf from "../../config";

/**
 *
 * @param path - Ubicación del archivo de excel subido mediante el middleware multer
 * @returns Array de objetos con los valores obtenidos del excel.
 */

export const upalodCvs = async (path: string) => {
  try {
    const workBook = XLSX.readFile(path);
    const workBookSheets = workBook.SheetNames;
    const dataExcel = XLSX.utils.sheet_to_json(
      workBook.Sheets[workBookSheets[0]]
    );
    return dataExcel;
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param users -Array de objetos que contiene los usuarios.
 * @returns 
 */
export const exportCsv = async (users: Object[]) => {
  try {
    const workSheet = XLSX.utils.json_to_sheet(users);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Hoja-1");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "user-export.xlsx");
    await sendEmail();
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param api_key -  Se lo pasa como variable de entorno y especifica la key generada en sendgrid para poder utilizar su servicio.
 * @param sender - Se lo pasa como variable de entorno y especifica quién es el emisor del email.
 * @param subject - Se lo pasa como variable de entorno y especifica a quién se enviará el email.
 * @param subject - El directorio donde se encuentra el archivo excel generado para ser enviado.
 * @returns Se retorna un booleando con el valor true en caso de que el envío del email haya sido exitoso.
 */
const sendEmail = async () => {
  try {
    sgMail.setApiKey(conf.emailSender.api_key);
    const pathToAttachment = `user-export.xlsx`;
    const attachment = fs.readFileSync(pathToAttachment).toString("base64");
    const msg: any = {
      to: conf.emailSender.subject,
      from: conf.emailSender.sender,
      subject: "Listado de Usuarios",
      text: "Listado de usuarios generado utilizando sheetJS y sendgrid como plataforma de comunicación",
      attachments: [
        {
          content: attachment,
          filename: "user-export.xlsx",
          type: "application/xlsx",
          disposition: "attachment",
        },
      ],
    };
    await sgMail.send(msg);
    return {
      sended: true,
    };
  } catch (error) {
    throw error;
  }
};
