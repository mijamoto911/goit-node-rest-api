import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

const getAllContacts = async (req, res) => {
  const data = await contactsService.listContacts();
  res.json(data);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.getContactById(id);
  if (!data) {
    throw new HttpError(404, 'Not found');
  }
  res.json(data);
};

const createContact = async (req, res) => {
  const data = await contactsService.addContact(req.body);
  res.status(201).json(data);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updated = await contactsService.updateContact(id, req.body);
  if (!updated) {
    throw new HttpError(404, 'Not found');
  }
  res.json(updated);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.removeContact(id);
  if (!data) {
    throw new HttpError(404, 'Not found');
  }
  res.status(200).json(data);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
