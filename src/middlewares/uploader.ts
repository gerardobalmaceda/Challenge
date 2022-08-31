import multer from "multer";

export const csvUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});
