import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

const getAllContacts = async (req, res) => {
  const data = await contactsService.listContacts();
  res.status(200).json(data);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.getContactById(id);
  if (!data) throw HttpError(404, 'Not found');
  res.status(200).json(data);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await contactsService.addContact({ name, email, phone });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updated = await contactsService.updateContact(id, req.body);
  if (!updated) throw HttpError(404, 'Not found');
  res.status(200).json(updated);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deleted = await contactsService.removeContact(id);
  if (!deleted) throw HttpError(404, 'Not found');
  res.status(200).json(deleted);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (typeof favorite !== 'boolean') {
    throw HttpError(400, "Missing or invalid 'favorite' field");
  }
  const updated = await contactsService.updateContact(id, { favorite });
  if (!updated) throw HttpError(404, 'Not found');
  res.status(200).json(updated);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
