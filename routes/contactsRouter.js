import express from 'express';
import contactsController from '../controllers/contactsControllers.js';

import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const contactsRouter = express.Router();
contactsRouter.use(authMiddleware);

contactsRouter.get('/', contactsController.getAllContacts);
contactsRouter.get('/:id', contactsController.getOneContact);
contactsRouter.post(
  '/',
  isEmptyBody,
  validateBody(createContactSchema),
  contactsController.createContact
);
contactsRouter.put(
  '/:id',
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsController.updateContact
);
contactsRouter.delete('/:id', contactsController.deleteContact);

contactsRouter.patch('/:id/favorite', contactsController.updateStatusContact);

export default contactsRouter;
