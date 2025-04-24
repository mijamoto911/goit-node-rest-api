import Contact from '../db/models/contacts.js';

export const listContacts = (owner) =>
  Contact.findAll({
    where: { owner },
  });

export const getContactById = (id, owner) =>
  Contact.findOne({ where: { id, owner } });

export const getContactByEmail = (email, owner) => {
  return Contact.findOne({ where: { email, owner } });
};

export const addContact = (data) => Contact.create(data);
export const createContact = (data, owner) => {
  return addContact({ ...data, owner });
};

export const updateContact = async (id, data, owner) => {
  const contact = await getContactById(id, owner);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};
export const removeContact = async (id, owner) => {
  const contact = await getContactById(id, owner);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateStatusContact = async (id, data, owner) => {
  const contact = await getContactById(id, owner);
  if (!contact) return null;

  return contact.update(
    { favorite: data.favorite },
    {
      returning: true,
    }
  );
};
