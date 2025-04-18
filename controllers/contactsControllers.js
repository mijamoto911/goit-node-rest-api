import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import checkNotFound from '../helpers/checkNotFound.js';

const getAllContacts = async (req, res) => {
  const data = await contactsService.listContacts();
  res.json(data);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const data = checkNotFound(await contactsService.getContactById(id));
  res.json(data);
};

const createContact = async (req, res) => {
  const data = await contactsService.addContact(req.body);
  res.status(201).json(data);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updated = checkNotFound(
    await contactsService.updateContact(id, req.body)
  );
  res.json(updated);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = checkNotFound(await contactsService.removeContact(id));
  res.status(200).json(data);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== 'boolean') {
    throw new HttpError(400, "Missing or invalid 'favorite' field");
  }

  const updated = checkNotFound(
    await contactsService.updateStatusContact(id, { favorite })
  );
  res.json(updated);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
