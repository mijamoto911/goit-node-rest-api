import multer from 'multer';
import path from 'path';
import HttpError from '../helpers/HttpError.js';

const uploadsDir = path.resolve('temp');
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split('.').pop();
  if (ext === 'exe') return cb(HttpError(400, '.exe files are not allowed'));
  cb(null, true);
};
const upload = multer({ storage, fileFilter });

export default function handleUpload(req, res, next) {
  if (req.is('multipart/form-data')) {
    return upload.single('avatars')(req, res, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  }

  next();
}
