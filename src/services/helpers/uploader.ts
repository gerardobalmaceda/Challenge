import XLSX from "xlsx";

export const upalodCvs = async (path: string) => {
  try {
    const workBook = XLSX.readFile(path);
    const workBookSheets = workBook.SheetNames;
    const dataExcel = XLSX.utils.sheet_to_json(workBook.Sheets[workBookSheets[0]]);
    return dataExcel;
  } catch (error) {
    throw error;
  }
};
