import HttpError from './HttpError.js';

const checkNotFound = (resource) => {
  if (!resource) throw HttpError(404, 'Not found');
  return resource;
};
export default checkNotFound;
