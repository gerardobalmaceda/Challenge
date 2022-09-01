import multer from "multer";
import fs from "fs";

export const csvUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync("public/")) {
        fs.mkdirSync("public/");
      }
      cb(null, "public/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});
