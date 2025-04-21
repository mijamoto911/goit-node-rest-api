import fs from 'fs/promises';
import path from 'path';
import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import checkNotFound from '../helpers/checkNotFound.js';

const avatarsDir = path.resolve('public', 'avatars');

const getAllContacts = async (req, res) => {
  const userId = req.user.id;
  const data = await contactsService.listContacts(userId);
  res.json(data);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const data = checkNotFound(await contactsService.getContactById(id, userId));
  res.json(data);
};

const createContact = async (req, res) => {
  let avatarURL = null;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(oldPath, newPath);
    avatarURL = path.join('public', 'avatars', filename);
  }
  const userId = req.user.id;
  const data = await contactsService.addContact({
    ...req.body,
    avatarURL,
    owner: userId,
  });
  res.status(201).json(data);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const updated = checkNotFound(
    await contactsService.updateContact(id, req.body, userId)
  );
  res.json(updated);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const data = checkNotFound(await contactsService.removeContact(id, userId));
  res.status(200).json(data);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const userId = req.user.id;
  if (typeof favorite !== 'boolean') {
    throw new HttpError(400, "Missing or invalid 'favorite' field");
  }

  const updated = checkNotFound(
    await contactsService.updateStatusContact(id, { favorite }, userId)
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
