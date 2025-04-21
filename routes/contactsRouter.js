import express from 'express';
import contactsController from '../controllers/contactsControllers.js';

import { validateBody, validateParam } from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import { idParamSchema } from '../schemas/paramsSchemas.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const contactsRouter = express.Router();
contactsRouter.use(authMiddleware);

contactsRouter.get('/', contactsController.getAllContacts);
contactsRouter.get(
  '/:id',
  validateParam(idParamSchema),
  contactsController.getOneContact
);
contactsRouter.post(
  '/',
  upload.single('avatars'),
  isEmptyBody,
  validateBody(createContactSchema),
  contactsController.createContact
);
contactsRouter.put(
  '/:id',
  validateParam(idParamSchema),
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsController.updateContact
);
contactsRouter.delete(
  '/:id',
  validateParam(idParamSchema),
  contactsController.deleteContact
);

contactsRouter.patch(
  '/:id/favorite',
  validateParam(idParamSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
