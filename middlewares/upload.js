import multer from 'multer';
import path from 'path';
import HttpError from '../helpers/HttpError.js';

const uploadsDir = path.resolve('temp');

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()} ${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split('.').pop();
  if (extension === 'exe') {
    return cb(HttpError(400, '.exe files are not allowed'));
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });

export default upload;
