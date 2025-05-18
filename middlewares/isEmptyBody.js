import HttpError from '../helpers/HttpError.js';

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, 'Missing fields');
  }
  next();
};

export default isEmptyBody;
