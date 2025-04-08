import express from 'express';
import contactsController from '../controllers/contactsControllers.js';
import validateBody from '../decorators/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);
contactsRouter.get('/:id', contactsController.getOneContact);
contactsRouter.post('/', isEmptyBody, contactsController.createContact);
contactsRouter.put(
  '/:id',
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsController.updateContact
);
contactsRouter.delete('/:id', contactsController.deleteContact);

contactsRouter.patch('/:id/favorite', contactsController.updateStatusContact);

export default contactsRouter;
