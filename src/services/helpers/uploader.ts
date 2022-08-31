import XLSX from "xlsx";
import sgMail from "@sendgrid/mail";
import fs from "fs";
import conf from "../../config";
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

export const exportCsv = async (users: any) => {
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
