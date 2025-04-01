import express from 'express';
import contactsController from '../controllers/contactsControllers.js';
import validateBody from '../decorators/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);
contactsRouter.get('/:id', contactsController.getOneContact);
contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  contactsController.createContact
);
contactsRouter.put(
  '/:id',
  validateBody(updateContactSchema),
  contactsController.updateContact
);
contactsRouter.delete('/:id', contactsController.deleteContact);

export default contactsRouter;
