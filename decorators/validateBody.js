import HttpError from '../helpers/HttpError.js';

const validateBody = (contactAddSchema) => {
  const func = (req, res, next) => {
    const { error } = contactAddSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
