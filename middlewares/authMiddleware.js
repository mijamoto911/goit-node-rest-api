import { verifyToken } from '../helpers/jwt.js';
import HttpError from '../helpers/HttpError.js';
import { findUser } from '../services/authServices.js';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, 'Authorization header missing'));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Bearer missing'));
  }
  const { payload, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, error.message));
  }
  const user = await findUser({ email: payload.email });
  if (!user || !user.token) {
    return next(HttpError(401, 'User not found'));
  }
  req.user = user;
  next();
};

export default authMiddleware;
