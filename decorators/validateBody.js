import HttpError from '../helpers/HttpError.js';

export const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};
export const validateParam = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);
  if (error) return next(HttpError(400, error.message));
  next();
};
