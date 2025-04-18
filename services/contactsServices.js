import User from '../db/models/contacts.js';

export const listContacts = () => User.findAll();
export const getContactById = (id) => User.findByPk(id);
export const addContact = (data) => User.create(data);

export const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};
export const removeContact = async (id) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};
export const updateStatusContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update(
    { favorite: data.favorite },
    {
      returning: true,
    }
  );
};
