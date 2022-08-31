import XLSX from "xlsx";
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "user-export.xlsx");
  } catch (error) {
    throw error;
  }
};
