import multer from 'multer';
import path from 'path';
import ErrorCreator from '../services/helpers/errorCreator';


export const csvUploader = multer({
	limits: { fileSize: 1024 * 1024 * 5 },
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'public/');
		},
		filename: (req, file, cb) => {
			cb(null, Date.now().toString());
		},
	}),
	fileFilter: (req, file, cb) => {
		const fileTypes = /csv|xlsx/i;
		if (!isValidFileType(file, fileTypes)) {
			const err = new ErrorCreator('Format is allowed', 400);
			cb(err);
		}
		cb(null, isValidFileType(file, fileTypes));
	},
})

const isValidFileType = (file: Express.Multer.File, fileTypes: RegExp) => {
	const extname = fileTypes.test(path.extname(file.originalname));
	const mimetype = fileTypes.test(file.mimetype);
	return extname && mimetype;
};