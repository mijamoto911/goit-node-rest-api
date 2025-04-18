import { verifyToken } from '../helpers/jwt.js';
import HttpError from '../helpers/HttpError.js';
import { findUser } from '../services/authServices.js';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, 'Authorization header missing'));
  }
  const [bearer, token] = authorization.trim().split(/\s+/);

  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Bearer missing'));
  }
  const { payload, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, error.message));
  }
  const user = await findUser({ id: payload.id });

  if (!user) {
    return next(HttpError(401, 'User not found'));
  }
  if (!user.token) {
    return next(HttpError(401, 'Token expired or user logged out'));
  }

  req.user = user;
  next();
};

export default authMiddleware;
